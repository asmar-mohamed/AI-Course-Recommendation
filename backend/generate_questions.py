
import json

data = [
    {
        "skill": "Python Programming",
        "questions": [
            {
                "text": "What is the difference between a list and a tuple in Python?",
                "choices": [
                    {"text": "Lists are immutable, tuples are mutable", "correct": False},
                    {"text": "Lists are mutable, tuples are immutable", "correct": True},
                    {"text": "Lists use parentheses, tuples use square brackets", "correct": False},
                    {"text": "Tuples are faster for searching, lists are faster for adding", "correct": False}
                ]
            },
            {
                "text": "What does the 'self' keyword represent in a Python class method?",
                "choices": [
                    {"text": "It refers to the class itself", "correct": False},
                    {"text": "It refers to the instance of the class", "correct": True},
                    {"text": "It is a reserved keyword for static methods", "correct": False},
                    {"text": "It is used to access global variables", "correct": False}
                ]
            },
            {
                "text": "What is a Python decorator?",
                "choices": [
                    {"text": "A design pattern that adds behavior to a function without modifying it", "correct": True},
                    {"text": "A way to define constant variables", "correct": False},
                    {"text": "A tool for documentation strings", "correct": False},
                    {"text": "A method to delete objects from memory", "correct": False}
                ]
            },
            {
                "text": "How do you handle exceptions in Python?",
                "choices": [
                    {"text": "try-except blocks", "correct": True},
                    {"text": "catch-finally blocks", "correct": False},
                    {"text": "error-handling functions", "correct": False},
                    {"text": "if-else statements", "correct": False}
                ]
            },
            {
                "text": "What is the result of '3 * 1**3' in Python?",
                "choices": [
                    {"text": "3", "correct": True},
                    {"text": "27", "correct": False},
                    {"text": "1", "correct": False},
                    {"text": "9", "correct": False}
                ]
            }
        ]
    },
    {
        "skill": "Data Science",
        "questions": [
            {
                "text": "What is the primary goal of Data Science?",
                "choices": [
                    {"text": "To build websites", "correct": False},
                    {"text": "To extract insights and knowledge from data", "correct": True},
                    {"text": "To manage server hardware", "correct": False},
                    {"text": "To write documentation", "correct": False}
                ]
            },
            {
                "text": "In a p-value calculation, what does a value less than 0.05 typically signify?",
                "choices": [
                    {"text": "Statistical significance", "correct": True},
                    {"text": "The data is invalid", "correct": False},
                    {"text": "The sample size is too small", "correct": False},
                    {"text": "No correlation exists", "correct": False}
                ]
            },
            {
                "text": "What is the difference between correlation and causation?",
                "choices": [
                    {"text": "They are the same thing", "correct": False},
                    {"text": "Correlation implies causation", "correct": False},
                    {"text": "Correlation measures relationship strength, causation implies one event causes another", "correct": True},
                    {"text": "Causation is always positive, correlation can be negative", "correct": False}
                ]
            },
            {
                "text": "What is data normalization?",
                "choices": [
                    {"text": "Scaling data to a standard range", "correct": True},
                    {"text": "Deleting outliers", "correct": False},
                    {"text": "Translating data to another language", "correct": False},
                    {"text": "Combining multiple datasets", "correct": False}
                ]
            },
            {
                "text": "Which of these is a common Data Science library in Python?",
                "choices": [
                    {"text": "Django", "correct": False},
                    {"text": "Pandas", "correct": True},
                    {"text": "Flask", "correct": False},
                    {"text": "Requests", "correct": False}
                ]
            }
        ]
    },
    {
        "skill": "Machine Learning",
        "questions": [
            {
                "text": "What is overfitting in Machine Learning?",
                "choices": [
                    {"text": "A model that performs well on training data but poorly on unseen data", "correct": True},
                    {"text": "A model that is too simple to capture patterns", "correct": False},
                    {"text": "Using too many GPUs", "correct": False},
                    {"text": "Running the model for too many epochs", "correct": False}
                ]
            },
            {
                "text": "Which algorithm is commonly used for classification?",
                "choices": [
                    {"text": "Linear Regression", "correct": False},
                    {"text": "Logistic Regression", "correct": True},
                    {"text": "K-Means Clustering", "correct": False},
                    {"text": "PCA", "correct": False}
                ]
            },
            {
                "text": "What is the bias-variance tradeoff?",
                "choices": [
                    {"text": "The balance between underfitting and overfitting", "correct": True},
                    {"text": "The cost of hardware vs software", "correct": False},
                    {"text": "The speed of training vs prediction", "correct": False},
                    {"text": "The ratio of input vs output features", "correct": False}
                ]
            },
            {
                "text": "What does 'supervised learning' require?",
                "choices": [
                    {"text": "Unlabeled data", "correct": False},
                    {"text": "Labeled data", "correct": True},
                    {"text": "A human supervisor during training", "correct": False},
                    {"text": "High-performance computers", "correct": False}
                ]
            },
            {
                "text": "Which of these is an ensemble learning method?",
                "choices": [
                    {"text": "Random Forest", "correct": True},
                    {"text": "Naive Bayes", "correct": False},
                    {"text": "SVM", "correct": False},
                    {"text": "K-NN", "correct": False}
                ]
            }
        ]
    },
    {
        "skill": "SQL",
        "questions": [
            {
                "text": "What does SQL stand for?",
                "choices": [
                    {"text": "Structured Query Language", "correct": True},
                    {"text": "Simple Quick Language", "correct": False},
                    {"text": "Sequential Query List", "correct": False},
                    {"text": "Standard Question Link", "correct": False}
                ]
            },
            {
                "text": "Which SQL clause is used to filter records?",
                "choices": [
                    {"text": "GROUP BY", "correct": False},
                    {"text": "ORDER BY", "correct": False},
                    {"text": "WHERE", "correct": True},
                    {"text": "SELECT", "correct": False}
                ]
            },
            {
                "text": "What is the difference between INNER JOIN and LEFT JOIN?",
                "choices": [
                    {"text": "INNER JOIN returns only matching rows; LEFT JOIN returns all rows from the left table", "correct": True},
                    {"text": "LEFT JOIN returns only matching rows; INNER JOIN returns all rows", "correct": False},
                    {"text": "They are identical in performance", "correct": False},
                    {"text": "INNER JOIN is only used for numbers", "correct": False}
                ]
            },
            {
                "text": "Which statement is used to remove all records from a table without deleting the table structure?",
                "choices": [
                    {"text": "DELETE", "correct": False},
                    {"text": "DROP", "correct": False},
                    {"text": "TRUNCATE", "correct": True},
                    {"text": "REMOVE", "correct": False}
                ]
            },
            {
                "text": "What is a PRIMARY KEY in SQL?",
                "choices": [
                    {"text": "A unique identifier for each record in a table", "correct": True},
                    {"text": "The first column in every table", "correct": False},
                    {"text": "A key used to encrypt the database", "correct": False},
                    {"text": "A foreign relationship to another table", "correct": False}
                ]
            }
        ]
    },
    {
        "skill": "Linux",
        "questions": [
            {
                "text": "Which command is used to list files in a directory?",
                "choices": [
                    {"text": "ls", "correct": True},
                    {"text": "cd", "correct": False},
                    {"text": "mkdir", "correct": False},
                    {"text": "pwd", "correct": False}
                ]
            },
            {
                "text": "What does the 'chmod' command do?",
                "choices": [
                    {"text": "Changes file permissions", "correct": True},
                    {"text": "Changes file owner", "correct": False},
                    {"text": "Changes file name", "correct": False},
                    {"text": "Copies a file", "correct": False}
                ]
            },
            {
                "text": "What is the 'root' user in Linux?",
                "choices": [
                    {"text": "A user with administrative privileges", "correct": True},
                    {"text": "A user who can only read files", "correct": False},
                    {"text": "The first user created on the system", "correct": False},
                    {"text": "A system backup account", "correct": False}
                ]
            },
            {
                "text": "Which command searches for a pattern in a text file?",
                "choices": [
                    {"text": "find", "correct": False},
                    {"text": "grep", "correct": True},
                    {"text": "cat", "correct": False},
                    {"text": "sed", "correct": False}
                ]
            },
            {
                "text": "What symbol is used for piping the output of one command to another?",
                "choices": [
                    {"text": ">", "correct": False},
                    {"text": "|", "correct": True},
                    {"text": "&", "correct": False},
                    {"text": "$", "correct": False}
                ]
            }
        ]
    },
    {
        "skill": "Cloud Computing",
        "questions": [
            {
                "text": "What does IaaS stand for?",
                "choices": [
                    {"text": "Infrastructure as a Service", "correct": True},
                    {"text": "Internet as a Service", "correct": False},
                    {"text": "Integration as a Service", "correct": False},
                    {"text": "Identity as a Service", "correct": False}
                ]
            },
            {
                "text": "What is cloud elasticity?",
                "choices": [
                    {"text": "The ability to scale resources up and down automatically", "correct": True},
                    {"text": "The flexibility of cloud pricing", "correct": False},
                    {"text": "The speed of data transfer", "correct": False},
                    {"text": "The security of cloud backups", "correct": False}
                ]
            },
            {
                "text": "Which of these is a popular cloud service provider?",
                "choices": [
                    {"text": "AWS", "correct": True},
                    {"text": "Adobe", "correct": False},
                    {"text": "AMD", "correct": False},
                    {"text": "Apache", "correct": False}
                ]
            },
            {
                "text": "What is a 'Region' in cloud computing?",
                "choices": [
                    {"text": "A specific geographical location consisting of multiple data centers", "correct": True},
                    {"text": "A software partition within a server", "correct": False},
                    {"text": "A type of database storage", "correct": False},
                    {"text": "A user group permission level", "correct": False}
                ]
            },
            {
                "text": "What is the benefit of serverless computing?",
                "choices": [
                    {"text": "Users don't need to manage the underlying server infrastructure", "correct": True},
                    {"text": "Users get a dedicated physical server for free", "correct": False},
                    {"text": "Servers are replaced by local PCs", "correct": False},
                    {"text": "It is always faster than any other method", "correct": False}
                ]
            }
        ]
    },
    {
        "skill": "Deep Learning",
        "questions": [
            {
                "text": "What is an Artificial Neural Network inspired by?",
                "choices": [
                    {"text": "The human brain", "correct": True},
                    {"text": "Computer microchips", "correct": False},
                    {"text": "Social networks", "correct": False},
                    {"text": "Tree structures", "correct": False}
                ]
            },
            {
                "text": "What is the role of an activation function in a neural network?",
                "choices": [
                    {"text": "To introduce non-linearity into the model", "correct": True},
                    {"text": "To reset the weights to zero", "correct": False},
                    {"text": "To increase the number of layers", "correct": False},
                    {"text": "To speed up data loading", "correct": False}
                ]
            },
            {
                "text": "What does 'Backpropagation' do?",
                "choices": [
                    {"text": "Updates the weights of the network based on error", "correct": True},
                    {"text": "Deletes unnecessary data", "correct": False},
                    {"text": "Combines multiple networks", "correct": False},
                    {"text": "Visualizes the model's output", "correct": False}
                ]
            },
            {
                "text": "What is a Convolutional Neural Network (CNN) primarily used for?",
                "choices": [
                    {"text": "Image recognition and processing", "correct": True},
                    {"text": "Database management", "correct": False},
                    {"text": "Network security", "correct": False},
                    {"text": "Audio compression", "correct": False}
                ]
            },
            {
                "text": "What is an 'epoch' in training?",
                "choices": [
                    {"text": "One complete pass through the entire training dataset", "correct": True},
                    {"text": "The time it takes to train one layer", "correct": False},
                    {"text": "A single piece of data", "correct": False},
                    {"text": "The error rate of the model", "correct": False}
                ]
            }
        ]
    },
    {
        "skill": "Troubleshooting",
        "questions": [
            {
                "text": "What is the first step in effective troubleshooting?",
                "choices": [
                    {"text": "Problem identification", "correct": True},
                    {"text": "Replacing hardware", "correct": False},
                    {"text": "Calling for help", "correct": False},
                    {"text": "Restarting the system", "correct": False}
                ]
            },
            {
                "text": "Why is it important to reproduce an error?",
                "choices": [
                    {"text": "To confirm the cause and verify the fix", "correct": True},
                    {"text": "To show others how bad it is", "correct": False},
                    {"text": "To waste time productively", "correct": False},
                    {"text": "To fill up log files", "correct": False}
                ]
            },
            {
                "text": "What does 'isolating the problem' mean?",
                "choices": [
                    {"text": "Narrowing down the cause to a specific component", "correct": True},
                    {"text": "Removing the computer from the network", "correct": False},
                    {"text": "Ignoring the error", "correct": False},
                    {"text": "Protecting other components from damage", "correct": False}
                ]
            },
            {
                "text": "Which of these is a common software troubleshooting technique?",
                "choices": [
                    {"text": "Checking log files", "correct": True},
                    {"text": "Buying a new CPU", "correct": False},
                    {"text": "Cleaning the keyboard", "correct": False},
                    {"text": "Reseating RAM", "correct": False}
                ]
            },
            {
                "text": "What is documented in a troubleshooting log?",
                "choices": [
                    {"text": "Symptoms, actions taken, and final solution", "correct": True},
                    {"text": "Personal opinions of the software", "correct": False},
                    {"text": "The exact time of every keystroke", "correct": False},
                    {"text": "A list of everyone who used the system", "correct": False}
                ]
            }
        ]
    }
]

sql = "-- SQL Script to insert tests and questions\n\n"

for i, test_data in enumerate(data):
    skill_name = test_data["skill"]
    test_title = f"{skill_name} Assessment"
    
    # Insert Test
    sql += f"-- Test for {skill_name}\n"
    sql += f"INSERT INTO tests (skill_id, title, duration) SELECT id, '{test_title}', 20 FROM skills WHERE name = '{skill_name}' LIMIT 1;\n\n"
    
    # Get the last inserted test ID (assuming SQLite/MySQL for general compatibility, here we'll use a local variable in the script logic if it were executed, but in SQL we need a subquery or variable)
    # Since we are generating a script, we can use a variable for the test_id if the DB supports it, or use subqueries.
    # To keep it cross-database friendly and simple, I'll use a subquery for question inserts.
    
    for q in test_data["questions"]:
        sql += f"-- Question: {q['text'][:50]}...\n"
        sql += f"INSERT INTO questions (test_id, text, points) VALUES ((SELECT id FROM tests WHERE title = '{test_title}' LIMIT 1), \"{q['text']}\", 10);\n"
        
        for choice in q["choices"]:
            is_correct = 1 if choice["correct"] else 0
            # Use a subquery to get the last inserted question_id for this specific text
            sql += f"INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = \"{q['text']}\" LIMIT 1), \"{choice['text']}\", {is_correct});\n"
        sql += "\n"
    sql += "\n"

with open("c:\\Users\\ASMAR\\Desktop\\AI-Course-Recommendation\\backend\\insert_questions.sql", "w", encoding='utf-8') as f:
    f.write(sql)

print("SQL script generated: c:\\Users\\ASMAR\\Desktop\\AI-Course-Recommendation\\backend\\insert_questions.sql")
