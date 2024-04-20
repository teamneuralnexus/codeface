import { Argon2id } from "oslo/password";
import { generateId } from "lucia";

export default eventHandler(async (event) => {
	const formData = await readBody(event);
	const email = formData.email
	if (
		typeof email !== "string"
	) {
		throw createError({
			message: "Invalid email",
			statusCode: 400
		});
	}
	const password = formData.password
	if (typeof password !== "string" || password.length < 6 || password.length > 255) {
		throw createError({
			message: "Invalid password",
			statusCode: 400
		});
	}

	const hashedPassword = await new Argon2id().hash(password);
	const userId = generateId(15);

    try {
        await sql`insert into auth_user values(${userId}, ${formData.fullName}, ${hashedPassword}, ${true}, ${email})`
    } catch (error) {
        console.log(error)
        throw createError({
			message: "Internal Server Error",
			statusCode: 500
		});
    }

	const session = await lucia.createSession(userId, {})
	appendHeader(event, "Set-Cookie", lucia.createSessionCookie(session.id).serialize())

    return {
        statusCode: 200,
        message: "User added successfully"
    }
});