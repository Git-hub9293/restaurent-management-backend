import express from "express";
import { ReadBranches } from "../../controllers/branch/readBranches";
import { AddBranch } from "../../controllers/branch/addBranch";
import { UpdateBranch } from "../../controllers/branch/updateBranch";
import { DeleteBranch } from "../../controllers/branch/deleteBranch";
import { RoleAuth } from "../../middlewares/roleAuth";

const router = express.Router();

router.get(`/read-branches/:uid`, ReadBranches);
router.get(`/read-branches`, ReadBranches);
router.post(`/add-branch`, RoleAuth, AddBranch);
router.put(`/update-branch/:uid`, RoleAuth, UpdateBranch);
router.delete(`/delete-branch/:uid`, RoleAuth, DeleteBranch);

export default router;
