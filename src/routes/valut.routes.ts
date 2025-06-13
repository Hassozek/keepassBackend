import { Router } from "express";
import { valutController } from "../controllers/valut.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

// Apply auth middleware to all valut routes
router.use("/valuts", authenticate);

// Get all valuts (with optional folderId query param)
router.get("/valuts", valutController.getValuts);

// Get valuts by folder ID
router.get("/valuts/folder/:id", (req, res, next) => {
  req.query.folderId = req.params.id;
  return valutController.getValuts(req, res, next);
});

// Get a single valut by ID
router.get("/valuts/:id", valutController.getValutById);

// Create a new valut
router.post(
  "/valuts",
  valutController.validateCreateValut,
  valutController.createValut,
);

// Update a valut
router.patch(
  "/valuts/:id",
  valutController.validateUpdateValut,
  valutController.updateValut,
);

// Delete a valut
router.delete(
  "/valuts/:id",
  valutController.validateDeleteValut,
  valutController.deleteValut,
);

export default router;
