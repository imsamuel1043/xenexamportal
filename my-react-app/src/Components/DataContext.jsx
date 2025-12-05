import { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

const STORAGE_KEY = "questionBank";
const EXAM_KEY = "assignedExams";

export const DataProvider = ({ children }) => {
    const [questions, setQuestions] = useState([]);
    const [exams, setExams] = useState([]);

    useEffect(() => {
        const savedQuestions = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        const savedExams = JSON.parse(localStorage.getItem(EXAM_KEY)) || [];
        setQuestions(savedQuestions);
        setExams(savedExams);
    }, []);

    const saveQuestions = (updated) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        setQuestions(updated);
    };

    const saveExams = (updated) => {
        localStorage.setItem(EXAM_KEY, JSON.stringify(updated));
        setExams(updated);
    };

    return (
        <DataContext.Provider
            value={{
                questions,
                setQuestions: saveQuestions,
                exams,
                setExams: saveExams
            }}
        >
            {children}
        </DataContext.Provider>
    );
};
