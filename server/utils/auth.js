import { Lucia } from "lucia"
import { webcrypto } from "node:crypto"
import { PostgresJsAdapter } from "@lucia-auth/adapter-postgresql";
import postgres from "postgres"

globalThis.crypto = webcrypto
const config = useRuntimeConfig()
export const sql = postgres(config.dbUrl, {
    ssl: {
        rejectUnauthorized: false
    }
})

const adapter = new PostgresJsAdapter(sql, {
	user: "auth_user",
	session: "user_session"
});

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !import.meta.dev
		}
	},
	getUserAttributes: (attributes) => {
		return {
			email: attributes.email,
            fullName: attributes.fullname,
            isAddedPassword: attributes.is_added_password
		};
	}
});
