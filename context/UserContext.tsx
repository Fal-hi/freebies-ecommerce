import { dataUser } from "@/libs/data";
import React, { createContext, useContext, useState } from "react";

type User = {
  name: string;
  email: string;
  image: string;
  phone?: string;
};

type UserContextType = {
  user: User;
  updateUser: (newData: Partial<User>) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>({
    ...dataUser,
    phone: "+1 234 567 890", // Default phone not in dataUser
  });

  const updateUser = (newData: Partial<User>) => {
    setUser((prev) => ({ ...prev, ...newData }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
