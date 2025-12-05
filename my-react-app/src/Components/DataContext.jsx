import { createContext, useState, useEffect, useContext } from "react";

export const DataContext = createContext();

const STORAGE_KEY = "questionBank";
const EXAM_KEY = "assignedExams";

export const DataProvider = ({ children }) => {

    
    const [questions, setQuestions] = useState([]);
    const [exams, setExams] = useState([]);

  

    const [user, setUser] = useState({
        isLoggedIn: false,
        role: null,
        name: "",
        email: ""
    });

  
    useEffect(() => {
        
        const savedQuestions = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        const savedExams = JSON.parse(localStorage.getItem(EXAM_KEY)) || [];

        setQuestions(savedQuestions);
        setExams(savedExams);


        const savedUser = JSON.parse(localStorage.getItem("user"));
        if (savedUser) {
            setUser({
                isLoggedIn: true,
                role: savedUser.role,
                name: savedUser.name || "",
                email: savedUser.email || ""
            });
        }
    }, []);



    const saveQuestions = (updated) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        setQuestions(updated);
    };

    const saveExams = (updated) => {
        localStorage.setItem(EXAM_KEY, JSON.stringify(updated));
        setExams(updated);
    };

  
    const login = (data) => {
        localStorage.setItem("user", JSON.stringify(data));
        setUser({
            isLoggedIn: true,
            role: data.role,
            name: data.name || "",
            email: data.email || ""
        });
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser({
            isLoggedIn: false,
            role: null,
            name: "",
            email: ""
        });
    };

    return (
        <DataContext.Provider
            value={{
                
                questions,
                setQuestions: saveQuestions,
                exams,
                setExams: saveExams,

                
                user,
                login,
                logout,
                setUser,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
