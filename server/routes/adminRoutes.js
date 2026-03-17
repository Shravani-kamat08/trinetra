const express = require("express");
const router = express.Router();

const {
    registerAdmin,
    loginAdmin,
    getAllAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin,
    getAdminByCommonId
} = require("../controllers/adminController");

/* REGISTER ADMIN */
router.post("/register", registerAdmin);

/* LOGIN ADMIN */
router.post("/login", loginAdmin);

/* get ADMIN by COMMONID */
router.post("/get-admin", getAdminByCommonId);

/* GET ALL ADMINS */
router.get("/", getAllAdmins);

/* GET SINGLE ADMIN */
router.get("/:id", getAdminById);


/* UPDATE ADMIN */
router.put("/:id", updateAdmin);


/* DELETE ADMIN */
router.delete("/:id", deleteAdmin);


module.exports = router;