import Contact from "../Modell/Contactmodel.js";
export const createcontact = async (req, res) => {
    try {
      const { name, email, message1 } = req.body;
  
      if (!name || !email || !message1) {
        return res.status(400).json({ error: "All fields are required." });
      }
  
      const newContact = new Contact({ name, email, message1 });
      await newContact.save();
      res.status(201).json({ message: "Contact saved successfully!" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  