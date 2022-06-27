import express from "express";
import {
  getAll,
  getById,
  insert,
  _delete,
  _update,
  exists,
  getByUserId,
} from "../service/crowdfunder.js";
// import { getAll as portfolioItems } from "../service/portfolio.js";
// import { insert as portfolioInsert } from "../service/portfolio.js";
import Joi from "joi";
import validator from "../middleware/validator.js";
import multer from "multer";
import { access, mkdir } from "fs/promises";
import { Op } from "sequelize";
import auth from "../middleware/authentication.js";
import { getAll as crowdfunderComments } from "../service/donations.js";

const Router = express.Router();

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const path = "./uploads";
    try {
      await access(path);
    } catch {
      await mkdir(path);
    }
    cb(null, path);
  },
  filename: (req, file, callback) => {
    const ext = file.originalname.split(".");
    callback(null, Date.now() + "." + ext[1]);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    //Atliekamas failu formato tikrinimas
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/gif"
    ) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
});

// Router.post('/upload_photo', upload.single('photo'), async(req, res) => {
//  console.log(req.file)
// })

Router.get("/comments/:id", async (req, res) => {
  const id = req.params.id;
  let entries = await getById(id);
  if (entries) {
    const comments = await crowdfunderComments(entries.id);
    res.json({ status: "success", message: comments });
  } else {
    res.json({ status: "danger", message: "Nepavyko surasti profilio" });
  }
});

Router.get("/", async (req, res) => {
  const crowdfunder = await getAll();

  if (crowdfunder) {
    for (let i = 0; i < crowdfunder.length; i++) {
      crowdfunder[i].donations = await crowdfunderComments(crowdfunder[i].id);
    }
    res.json({ message: crowdfunder, status: "success" });
  } else {
    res.json({ message: "an Error has occured", status: "danger" });
  }
});

Router.get("/user/:UserId", async (req, res) => {
  const UserId = req.params.UserId;
  let fundraiser = await getByUserId(UserId);

  if (fundraiser) {
    res.json({ message: fundraiser, status: "success" });
  } else {
    res.json({ message: "An error has occured", status: "danger" });
  }
});

Router.post("/create", auth, upload.single("cf_image"), async (req, res) => {
  console.log(req.file);
  req.body.cf_image = req.file.filename;
  if (await insert(req.body)) {
    res.json({ status: "success", message: "Fund raiser was created" });
  } else {
    res.json({ status: "danger", message: "Error" });
  }
  // if (req.files.cf_image) {
  //   let path = req.files.cf_image[0].path.replaceAll("\\", "/");
  //   req.body.cf_image = path;
  // }

  // let ProfileId = false;
  // if ((ProfileId = await insert(req.body))) {
  //   req.files.portfolio_items.map(async (image) => {
  //     let path = image.path.replaceAll("\\", "/");
  //     await portfolioInsert({ image_url: path, ProfileId });
  //   });
  //   res.json({ status: "success", message: "Fundraiser successfully created" });
  // } else {
  //   res.json({ status: "danger", message: "Error occured creating crowdfunder" });
  // }
});

// Router.post('/upload',upload.single('profile_image'), profileSchema, async (req,res) => {
//     res.send('Done')
// })

// Router.get("/filter/cf_goal/:rate", async (req, res) => {
//   const rate = req.params.rate;
//   const crowdfunder = await getAll({
//     where: {
//       hourly_rate: {
//         [Op.gte]: rate
//       },
//     },
//   });

//   if (crowdfunder) {
//     res.json({ status: "success", message: crowdfunder });
//   } else {
//     res.json({ message: "An error has occured", status: "danger" });
//   }
// });

// Router.get("/sort/DESC", async (req, res) => {
//   const crowdfunder = await getAll({order: [
//     ['headline', 'DESC']
//   ]});

//   if (crowdfunder) {
//     res.json({ status: "success", message: crowdfunder });
//   } else {
//     res.json({ message: "Error occured", status: "danger" });
//   }
// });

// Router.get("/sort/asc", async (req, res) => {
//   const crowdfunder = await getAll({
//     order: [
//       ['headline', 'ASC']
//     ]
// });

//   if (crowdfunder) {
//     res.json({ status: "success", message: crowdfunder });
//   } else {
//     res.json({ message: "Error has occured", status: "danger" });
//   }
// });

Router.get("/single/:id", async (req, res) => {
  const id = req.params.id;
  let entries = await getById(id);
  if (entries) {
    res.json({ status: "success", message: entries });
  } else {
    res.json({ status: "danger", message: "Nepavyko surasti profilio" });
  }
});

// // const crowfunderFields = upload.fields([
// //   { name: "cf_goal", maxCount: 1 },
// //   { name: "portfolio_items", maxCount: 20 },
// // ]);

// // Router.post('/upload',upload.single('profile_image'), profileSchema, async (req,res) => {
// //     res.send('Done')
// // })

Router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);

  try {
    await _delete(id);
    res.json({ status: "success", message: "Crowdfunder was deleted" });
  } catch {
    res.json({ status: "danger", message: "Crowdfunder was not deleted" });
  }
});

Router.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const crowdfunder = req.body;

  try {
    await _update(id, crowdfunder);
    res.json({ status: "success", message: "crowdfunder was updated" });
  } catch {
    res.json({ status: "danger", message: "crowdfunder was not renewed" });
  }
});

// Router.get('/edit/:user_id', auth, async (req, res) => {
//   const user_id = req.params.user_id
//   let crowdfunder = await getByUserId(user_id);
//   if (crowdfunder) {
//     const portfolio = await portfolioItems(profile.id);

//     if (portfolio) profile.portfolio = portfolio;
//     res.json({ status: "success", message: profile });
//   } else {
//     res.json({ status: "danger", message: "Nepavyko surasti profilio" });
//   }
// });

// Router.put('/update/', auth, crowdfunderSchema, async (req, res) => {
//   const user_id = req.body.UserId
//   const crowdfunder = await getByUserId(user_id)

//   if(await _update(crowdfunder.id, req.body)) {
//     res.json({message: 'Crowdfunder was successfully renwed', status: 'success'})
//   }else {
//     res.json({message: 'An error has occured', status: 'danger'})
//   }
// })
export default Router;
