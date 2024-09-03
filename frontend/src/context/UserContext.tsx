import { createContext, useState } from 'react';

export const UserContext = createContext(null as any);

type UserContextT = {
	children: React.ReactNode;
};
export const UserContextProvider = ({ children }: UserContextT) => {
	// const [municipalityDetail, setMunicipalityDetail] = useState("");
	const [user, setUser] = useState('admin');

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};
