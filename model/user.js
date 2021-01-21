module.exports = mongoose => {
    const User = mongoose.model(
        "user", 
        mongoose.Schema(
            {
                userName: {
                    type: String,
                    required: true,
                    min: 6,
                    max: 225
                },                
                email: {
                    type: String,
                    required: true,
                    min: 6,
                    max: 225
                },
                password: {
                    type: String,
                    required: true,
                    min: 6,
                    max: 225
                },
                confirmPwd: {
                    type: String,
                    required: true,
                    min: 6,
                    max: 225
                },
                status: Boolean
            },
            {timestamps: true}
        )
    );
    return User;
}