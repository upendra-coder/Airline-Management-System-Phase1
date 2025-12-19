const validate = (schema) => (req, res, next) => {
    if (!schema) {
        console.error("🚨 CRITICAL: Validation Schema is missing!");
        return res.status(500).json({ message: "Server Error: Schema missing" });
    }

    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        // 1. Check if it is a Zod Error
        // We check 'error.name' or if 'error.errors' exists
        if (error.name === 'ZodError' || error.errors) {
            
            // Format the errors into a nice string
            // Example: "Price must be a number, Origin is required"
            const message = error.errors.map(err => err.message).join(", ");
            
            return res.status(400).json({ message });
        }

        // 2. Generic Error
        console.error("❌ Unexpected Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = validate;