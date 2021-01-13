module.exports = mongoose => {
    const User = mongoose.model(
        "user", 
        mongoose.Schema(
            {
                name: String,
                email: String,
                status: Boolean
            },
            {timestamps: true}
        )
    );
    return User;
}