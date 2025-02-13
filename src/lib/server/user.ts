import { db } from "./db";
import { eq, lt, gte, ne } from 'drizzle-orm';
import { encodeBase32LowerCase } from '@oslojs/encoding';
import { fail} from '@sveltejs/kit';

import * as table from '$lib/server/db/schema';

export async function createUser(googleId: string, name: string): Promise<User | ReturnType<typeof fail>> {
	const userId = generateUserId();
	//console.log(userId)
	//console.log(name)
	//console.log(googleId)

	try {
		await db.insert(table.user).values({ id: userId, googleId, name });
	} catch (e) {
		console.error("Database insert failed:", e);
		return fail(500, { message: 'An error has occurred' });
	}

	const user: User = {
		id: userId,
		googleId,
		name
	};
	return user;
}

export async function getUserFromGoogleId(googleId: string): Promise<User | null> {

	try {
		const row = await db.select().from(table.user).where(eq(table.user.googleId, googleId));

		// If no user is found, return null
		if (row.length === 0) {
			return null;
		}

		// Extract user data
		const user: User = {
			id: row[0].id,
			googleId, // Use the provided googleId since we didn't select it explicitly
			name: row[0].name ?? "",// Handle possible null values
		};

		//console.log(user)
		return user;
	} catch (e) {
		console.error("User not found", e);
		return null;
	}
}

export interface User {
	id: string;
	googleId: string;
	name: string;
}

function generateUserId() {
	// ID with 120 bits of entropy, or about the same as UUID v4.
	const bytes = crypto.getRandomValues(new Uint8Array(15));
	const id = encodeBase32LowerCase(bytes);
	return id;
}