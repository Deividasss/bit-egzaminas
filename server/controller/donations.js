import express from "express";
import { getAll, insert, _delete } from "../service/donations.js";
import auth from "../middleware/authentication.js";
import { getById, _update } from "../service/crowdfunder.js";

const Router = express.Router();

Router.get("/", async (req, res) => {
  const donations = await getAll();

  if (donations) {
    res.json({ message: profiles, status: "success" });
  } else {
    res.json({ message: "an Error occured", status: "danger" });
  }
});

Router.post("/donate", auth, async (req, res) => {
  const id = req.body.CrowdFunderId;
  if (await insert(req.body)) {
    const crowdfunder = await getById(id);
    const donations = await getAll(id);
    let sum = 0;
    for (const don of donations) {
      sum += don.donation;
    }
    if (sum >= crowdfunder.cf_goal) {
      await _update(id, { success: 1 });
    }
    res.json({ status: "success", message: "Donation was sent" });
  } else {
    res.json({ status: "danger", message: "Error" });
  }
});

Router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await _delete(id);
    res.json({ status: "success", message: "Comment was deleted" });
  } catch {
    res.json({ status: "danger", message: "Deleting comment unsuccesfull" });
  }
});

export default Router;
