import { Router } from "express";
import Person, { IPerson } from "../models/Person";

const router = Router();

interface IError {
  error: string;
}

// Create a new person
router.post("/", async (req, res) => {
  const person: IPerson = new Person({
    name: req.body.name,
    surname: req.body.surname,
    city: req.body.city,
    address: req.body.address,
    phone: req.body.phone,
  });

  try {
    const savedPerson = await person.save();
    res.status(201).send(savedPerson);
  } catch (error) {
    if (error instanceof Error) {
      const responseError: IError = { error: error.message };
      res.status(400).send(responseError);
    }
  }
});

// Get all persons
router.get("/", async (req, res) => {
  try {
    const persons = await Person.find();
    res.status(200).send(persons);
  } catch (error) {
    if (error instanceof Error) {
      const responseError: IError = { error: error.message };
      res.status(500).send(responseError);
    }
  }
});

// Get person by Id
router.get("/:id", async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) {
      return res.status(404).send({ error: "Person not found" });
    }
    res.status(200).send(person);
  } catch (error) {
    if (error instanceof Error) {
      const responseError: IError = { error: error.message };
      res.status(500).send(responseError);
    }
  }
});

// Update a person by id
router.put("/:id", async (req, res) => {
  try {
    const person = await Person.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!person) {
      return res.status(404).send({ error: "Person not found" });
    }
    res.status(200).send(person);
  } catch (error) {
    if (error instanceof Error) {
      const responseError: IError = { error: error.message };
      res.status(500).send(responseError);
    }
  }
});

// Delete a person by id
router.delete("/:id", async (req, res) => {
  try {
    const person = await Person.findByIdAndDelete(req.params.id);
    if (!person) {
      return res.status(404).send({ error: "Person not found" });
    }
    res.status(204).send();
  } catch (error) {
    if (error instanceof Error) {
      const responseError: IError = { error: error.message };
      res.status(500).send(responseError);
    }
  }
});

export default router;
