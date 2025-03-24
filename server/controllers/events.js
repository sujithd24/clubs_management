const Event = require("../models/events");

// Create a new event document
exports.createEvent = (req, res) => {
  const newEvent = new Event(req.body);
  newEvent.save()
    .then(() => res.status(201).send("Event saved successfully!"))
    .catch(err => res.status(400).send("Error saving event:", err));
};

// Read all event documents
exports.getAllEvents = (req, res) => {
  Event.find()
    .then(events => res.status(200).json(events))
    .catch(err => res.status(400).send("Error fetching events:"));
};

// Read a specific event document by ID
exports.getEventById = (req, res) => {
  const eventId = req.params.id;
  Event.findById(eventId)
    .then(event => {
      if (event) {
        res.status(200).json(event);
      } else {
        res.status(404).send("Event not found.");
      }
    })
    .catch(err => res.status(400).send("Error fetching event:", err));
};

// Update a specific event document by ID
exports.updateEvent = (req, res) => {
  const eventId = req.params.id;
  Event.findByIdAndUpdate(eventId, req.body, { new: true })
    .then(updatedEvent => {
      if (updatedEvent) {
        res.status(200).json(updatedEvent);
      } else {
        res.status(404).send("Event not found.");
      }
    })
    .catch(err => res.status(400).send("Error updating event:", err));
};

// Delete a specific event document by ID
exports.deleteEvent = (req, res) => {
  const eventId = req.params.id;
  Event.findByIdAndDelete(eventId)
    .then(deletedEvent => {
      if (deletedEvent) {
        res.status(200).send("Event deleted.");
      } else {
        res.status(404).send("Event not found.");
      }
    })
    .catch(err => res.status(400).send("Error deleting event:", err));
};
