import { Argon2id } from "oslo/password";

export default eventHandler(async (event) => {
	const formData = await readBody(event);
	const email = formData.email;
	if (
		typeof email !== "string"
	) {
		throw createError({
			message: "Invalid email",
			statusCode: 400
		});
	}
	const password = formData.password;
	if (typeof password !== "string" || password.length < 6 || password.length > 255) {
		throw createError({
			message: "Invalid password",
			statusCode: 400
		});
	}

    try {
        const existingUser = await sql`select * from auth_user where email=${email}`
        if(existingUser.length==0) {
            throw createError({
                message: "Incorrect email or password",
                statusCode: 400
            })
        }
        
        const validPassword = await new Argon2id().verify(existingUser[0].hashed_password, password);
        if (!validPassword) {
            throw createError({
                message: "Incorrect email or password",
                statusCode: 400
            });
        }
        const session = await lucia.createSession(existingUser[0].id, {})
        appendHeader(event, "Set-Cookie", lucia.createSessionCookie(session.id).serialize())
        
    } catch (error) {
        console.log(error)
        throw createError({
            message: "Internal Server Error",
			statusCode: 500
		});
    }
    

    return {
        statusCode: 200,
        message: "Logged in successfully"
    }

});