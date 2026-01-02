-- SQL Script to insert tests and questions

-- Test for Python Programming
INSERT INTO tests (skill_id, title, duration) SELECT id, 'Python Programming Assessment', 20 FROM skills WHERE name = 'Python Programming' LIMIT 1;

-- Question: What is the difference between a list and a tuple ...
INSERT INTO questions (test_id, text, points) VALUES ((SELECT id FROM tests WHERE title = 'Python Programming Assessment' LIMIT 1), "What is the difference between a list and a tuple in Python?", 10);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is the difference between a list and a tuple in Python?" LIMIT 1), "Lists are immutable, tuples are mutable", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is the difference between a list and a tuple in Python?" LIMIT 1), "Lists are mutable, tuples are immutable", 1);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is the difference between a list and a tuple in Python?" LIMIT 1), "Lists use parentheses, tuples use square brackets", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is the difference between a list and a tuple in Python?" LIMIT 1), "Tuples are faster for searching, lists are faster for adding", 0);

-- Question: What does the 'self' keyword represent in a Python...
INSERT INTO questions (test_id, text, points) VALUES ((SELECT id FROM tests WHERE title = 'Python Programming Assessment' LIMIT 1), "What does the 'self' keyword represent in a Python class method?", 10);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What does the 'self' keyword represent in a Python class method?" LIMIT 1), "It refers to the class itself", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What does the 'self' keyword represent in a Python class method?" LIMIT 1), "It refers to the instance of the class", 1);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What does the 'self' keyword represent in a Python class method?" LIMIT 1), "It is a reserved keyword for static methods", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What does the 'self' keyword represent in a Python class method?" LIMIT 1), "It is used to access global variables", 0);

-- Question: What is a Python decorator?...
INSERT INTO questions (test_id, text, points) VALUES ((SELECT id FROM tests WHERE title = 'Python Programming Assessment' LIMIT 1), "What is a Python decorator?", 10);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is a Python decorator?" LIMIT 1), "A design pattern that adds behavior to a function without modifying it", 1);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is a Python decorator?" LIMIT 1), "A way to define constant variables", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is a Python decorator?" LIMIT 1), "A tool for documentation strings", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is a Python decorator?" LIMIT 1), "A method to delete objects from memory", 0);

-- Question: How do you handle exceptions in Python?...
INSERT INTO questions (test_id, text, points) VALUES ((SELECT id FROM tests WHERE title = 'Python Programming Assessment' LIMIT 1), "How do you handle exceptions in Python?", 10);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "How do you handle exceptions in Python?" LIMIT 1), "try-except blocks", 1);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "How do you handle exceptions in Python?" LIMIT 1), "catch-finally blocks", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "How do you handle exceptions in Python?" LIMIT 1), "error-handling functions", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "How do you handle exceptions in Python?" LIMIT 1), "if-else statements", 0);

-- Question: What is the result of '3 * 1**3' in Python?...
INSERT INTO questions (test_id, text, points) VALUES ((SELECT id FROM tests WHERE title = 'Python Programming Assessment' LIMIT 1), "What is the result of '3 * 1**3' in Python?", 10);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is the result of '3 * 1**3' in Python?" LIMIT 1), "3", 1);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is the result of '3 * 1**3' in Python?" LIMIT 1), "27", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is the result of '3 * 1**3' in Python?" LIMIT 1), "1", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is the result of '3 * 1**3' in Python?" LIMIT 1), "9", 0);


-- Test for Data Science
INSERT INTO tests (skill_id, title, duration) SELECT id, 'Data Science Assessment', 20 FROM skills WHERE name = 'Data Science' LIMIT 1;

-- Question: What is the primary goal of Data Science?...
INSERT INTO questions (test_id, text, points) VALUES ((SELECT id FROM tests WHERE title = 'Data Science Assessment' LIMIT 1), "What is the primary goal of Data Science?", 10);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is the primary goal of Data Science?" LIMIT 1), "To build websites", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is the primary goal of Data Science?" LIMIT 1), "To extract insights and knowledge from data", 1);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is the primary goal of Data Science?" LIMIT 1), "To manage server hardware", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is the primary goal of Data Science?" LIMIT 1), "To write documentation", 0);

-- Question: In a p-value calculation, what does a value less t...
INSERT INTO questions (test_id, text, points) VALUES ((SELECT id FROM tests WHERE title = 'Data Science Assessment' LIMIT 1), "In a p-value calculation, what does a value less than 0.05 typically signify?", 10);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "In a p-value calculation, what does a value less than 0.05 typically signify?" LIMIT 1), "Statistical significance", 1);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "In a p-value calculation, what does a value less than 0.05 typically signify?" LIMIT 1), "The data is invalid", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "In a p-value calculation, what does a value less than 0.05 typically signify?" LIMIT 1), "The sample size is too small", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "In a p-value calculation, what does a value less than 0.05 typically signify?" LIMIT 1), "No correlation exists", 0);

-- Question: What is the difference between correlation and cau...
INSERT INTO questions (test_id, text, points) VALUES ((SELECT id FROM tests WHERE title = 'Data Science Assessment' LIMIT 1), "What is the difference between correlation and causation?", 10);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is the difference between correlation and causation?" LIMIT 1), "They are the same thing", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is the difference between correlation and causation?" LIMIT 1), "Correlation implies causation", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is the difference between correlation and causation?" LIMIT 1), "Correlation measures relationship strength, causation implies one event causes another", 1);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is the difference between correlation and causation?" LIMIT 1), "Causation is always positive, correlation can be negative", 0);

-- Question: What is data normalization?...
INSERT INTO questions (test_id, text, points) VALUES ((SELECT id FROM tests WHERE title = 'Data Science Assessment' LIMIT 1), "What is data normalization?", 10);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is data normalization?" LIMIT 1), "Scaling data to a standard range", 1);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is data normalization?" LIMIT 1), "Deleting outliers", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is data normalization?" LIMIT 1), "Translating data to another language", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is data normalization?" LIMIT 1), "Combining multiple datasets", 0);

-- Question: Which of these is a common Data Science library in...
INSERT INTO questions (test_id, text, points) VALUES ((SELECT id FROM tests WHERE title = 'Data Science Assessment' LIMIT 1), "Which of these is a common Data Science library in Python?", 10);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "Which of these is a common Data Science library in Python?" LIMIT 1), "Django", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "Which of these is a common Data Science library in Python?" LIMIT 1), "Pandas", 1);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "Which of these is a common Data Science library in Python?" LIMIT 1), "Flask", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "Which of these is a common Data Science library in Python?" LIMIT 1), "Requests", 0);


-- Test for Machine Learning
INSERT INTO tests (skill_id, title, duration) SELECT id, 'Machine Learning Assessment', 20 FROM skills WHERE name = 'Machine Learning' LIMIT 1;

-- Question: What is overfitting in Machine Learning?...
INSERT INTO questions (test_id, text, points) VALUES ((SELECT id FROM tests WHERE title = 'Machine Learning Assessment' LIMIT 1), "What is overfitting in Machine Learning?", 10);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is overfitting in Machine Learning?" LIMIT 1), "A model that performs well on training data but poorly on unseen data", 1);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is overfitting in Machine Learning?" LIMIT 1), "A model that is too simple to capture patterns", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is overfitting in Machine Learning?" LIMIT 1), "Using too many GPUs", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is overfitting in Machine Learning?" LIMIT 1), "Running the model for too many epochs", 0);

-- Question: Which algorithm is commonly used for classificatio...
INSERT INTO questions (test_id, text, points) VALUES ((SELECT id FROM tests WHERE title = 'Machine Learning Assessment' LIMIT 1), "Which algorithm is commonly used for classification?", 10);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "Which algorithm is commonly used for classification?" LIMIT 1), "Linear Regression", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "Which algorithm is commonly used for classification?" LIMIT 1), "Logistic Regression", 1);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "Which algorithm is commonly used for classification?" LIMIT 1), "K-Means Clustering", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "Which algorithm is commonly used for classification?" LIMIT 1), "PCA", 0);

-- Question: What is the bias-variance tradeoff?...
INSERT INTO questions (test_id, text, points) VALUES ((SELECT id FROM tests WHERE title = 'Machine Learning Assessment' LIMIT 1), "What is the bias-variance tradeoff?", 10);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is the bias-variance tradeoff?" LIMIT 1), "The balance between underfitting and overfitting", 1);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is the bias-variance tradeoff?" LIMIT 1), "The cost of hardware vs software", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is the bias-variance tradeoff?" LIMIT 1), "The speed of training vs prediction", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is the bias-variance tradeoff?" LIMIT 1), "The ratio of input vs output features", 0);

-- Question: What does 'supervised learning' require?...
INSERT INTO questions (test_id, text, points) VALUES ((SELECT id FROM tests WHERE title = 'Machine Learning Assessment' LIMIT 1), "What does 'supervised learning' require?", 10);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What does 'supervised learning' require?" LIMIT 1), "Unlabeled data", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What does 'supervised learning' require?" LIMIT 1), "Labeled data", 1);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What does 'supervised learning' require?" LIMIT 1), "A human supervisor during training", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What does 'supervised learning' require?" LIMIT 1), "High-performance computers", 0);

-- Question: Which of these is an ensemble learning method?...
INSERT INTO questions (test_id, text, points) VALUES ((SELECT id FROM tests WHERE title = 'Machine Learning Assessment' LIMIT 1), "Which of these is an ensemble learning method?", 10);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "Which of these is an ensemble learning method?" LIMIT 1), "Random Forest", 1);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "Which of these is an ensemble learning method?" LIMIT 1), "Naive Bayes", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "Which of these is an ensemble learning method?" LIMIT 1), "SVM", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "Which of these is an ensemble learning method?" LIMIT 1), "K-NN", 0);


-- Test for SQL
INSERT INTO tests (skill_id, title, duration) SELECT id, 'SQL Assessment', 20 FROM skills WHERE name = 'SQL' LIMIT 1;

-- Question: What does SQL stand for?...
INSERT INTO questions (test_id, text, points) VALUES ((SELECT id FROM tests WHERE title = 'SQL Assessment' LIMIT 1), "What does SQL stand for?", 10);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What does SQL stand for?" LIMIT 1), "Structured Query Language", 1);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What does SQL stand for?" LIMIT 1), "Simple Quick Language", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What does SQL stand for?" LIMIT 1), "Sequential Query List", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What does SQL stand for?" LIMIT 1), "Standard Question Link", 0);

-- Question: Which SQL clause is used to filter records?...
INSERT INTO questions (test_id, text, points) VALUES ((SELECT id FROM tests WHERE title = 'SQL Assessment' LIMIT 1), "Which SQL clause is used to filter records?", 10);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "Which SQL clause is used to filter records?" LIMIT 1), "GROUP BY", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "Which SQL clause is used to filter records?" LIMIT 1), "ORDER BY", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "Which SQL clause is used to filter records?" LIMIT 1), "WHERE", 1);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "Which SQL clause is used to filter records?" LIMIT 1), "SELECT", 0);

-- Question: What is the difference between INNER JOIN and LEFT...
INSERT INTO questions (test_id, text, points) VALUES ((SELECT id FROM tests WHERE title = 'SQL Assessment' LIMIT 1), "What is the difference between INNER JOIN and LEFT JOIN?", 10);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is the difference between INNER JOIN and LEFT JOIN?" LIMIT 1), "INNER JOIN returns only matching rows; LEFT JOIN returns all rows from the left table", 1);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is the difference between INNER JOIN and LEFT JOIN?" LIMIT 1), "LEFT JOIN returns only matching rows; INNER JOIN returns all rows", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is the difference between INNER JOIN and LEFT JOIN?" LIMIT 1), "They are identical in performance", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is the difference between INNER JOIN and LEFT JOIN?" LIMIT 1), "INNER JOIN is only used for numbers", 0);

-- Question: Which statement is used to remove all records from...
INSERT INTO questions (test_id, text, points) VALUES ((SELECT id FROM tests WHERE title = 'SQL Assessment' LIMIT 1), "Which statement is used to remove all records from a table without deleting the table structure?", 10);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "Which statement is used to remove all records from a table without deleting the table structure?" LIMIT 1), "DELETE", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "Which statement is used to remove all records from a table without deleting the table structure?" LIMIT 1), "DROP", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "Which statement is used to remove all records from a table without deleting the table structure?" LIMIT 1), "TRUNCATE", 1);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "Which statement is used to remove all records from a table without deleting the table structure?" LIMIT 1), "REMOVE", 0);

-- Question: What is a PRIMARY KEY in SQL?...
INSERT INTO questions (test_id, text, points) VALUES ((SELECT id FROM tests WHERE title = 'SQL Assessment' LIMIT 1), "What is a PRIMARY KEY in SQL?", 10);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is a PRIMARY KEY in SQL?" LIMIT 1), "A unique identifier for each record in a table", 1);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is a PRIMARY KEY in SQL?" LIMIT 1), "The first column in every table", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is a PRIMARY KEY in SQL?" LIMIT 1), "A key used to encrypt the database", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is a PRIMARY KEY in SQL?" LIMIT 1), "A foreign relationship to another table", 0);


-- Test for Linux
INSERT INTO tests (skill_id, title, duration) SELECT id, 'Linux Assessment', 20 FROM skills WHERE name = 'Linux' LIMIT 1;

-- Question: Which command is used to list files in a directory...
INSERT INTO questions (test_id, text, points) VALUES ((SELECT id FROM tests WHERE title = 'Linux Assessment' LIMIT 1), "Which command is used to list files in a directory?", 10);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "Which command is used to list files in a directory?" LIMIT 1), "ls", 1);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "Which command is used to list files in a directory?" LIMIT 1), "cd", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "Which command is used to list files in a directory?" LIMIT 1), "mkdir", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "Which command is used to list files in a directory?" LIMIT 1), "pwd", 0);

-- Question: What does the 'chmod' command do?...
INSERT INTO questions (test_id, text, points) VALUES ((SELECT id FROM tests WHERE title = 'Linux Assessment' LIMIT 1), "What does the 'chmod' command do?", 10);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What does the 'chmod' command do?" LIMIT 1), "Changes file permissions", 1);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What does the 'chmod' command do?" LIMIT 1), "Changes file owner", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What does the 'chmod' command do?" LIMIT 1), "Changes file name", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What does the 'chmod' command do?" LIMIT 1), "Copies a file", 0);

-- Question: What is the 'root' user in Linux?...
INSERT INTO questions (test_id, text, points) VALUES ((SELECT id FROM tests WHERE title = 'Linux Assessment' LIMIT 1), "What is the 'root' user in Linux?", 10);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is the 'root' user in Linux?" LIMIT 1), "A user with administrative privileges", 1);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is the 'root' user in Linux?" LIMIT 1), "A user who can only read files", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is the 'root' user in Linux?" LIMIT 1), "The first user created on the system", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is the 'root' user in Linux?" LIMIT 1), "A system backup account", 0);

-- Question: Which command searches for a pattern in a text fil...
INSERT INTO questions (test_id, text, points) VALUES ((SELECT id FROM tests WHERE title = 'Linux Assessment' LIMIT 1), "Which command searches for a pattern in a text file?", 10);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "Which command searches for a pattern in a text file?" LIMIT 1), "find", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "Which command searches for a pattern in a text file?" LIMIT 1), "grep", 1);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "Which command searches for a pattern in a text file?" LIMIT 1), "cat", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "Which command searches for a pattern in a text file?" LIMIT 1), "sed", 0);

-- Question: What symbol is used for piping the output of one c...
INSERT INTO questions (test_id, text, points) VALUES ((SELECT id FROM tests WHERE title = 'Linux Assessment' LIMIT 1), "What symbol is used for piping the output of one command to another?", 10);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What symbol is used for piping the output of one command to another?" LIMIT 1), ">", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What symbol is used for piping the output of one command to another?" LIMIT 1), "|", 1);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What symbol is used for piping the output of one command to another?" LIMIT 1), "&", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What symbol is used for piping the output of one command to another?" LIMIT 1), "$", 0);


-- Test for Cloud Computing
INSERT INTO tests (skill_id, title, duration) SELECT id, 'Cloud Computing Assessment', 20 FROM skills WHERE name = 'Cloud Computing' LIMIT 1;

-- Question: What does IaaS stand for?...
INSERT INTO questions (test_id, text, points) VALUES ((SELECT id FROM tests WHERE title = 'Cloud Computing Assessment' LIMIT 1), "What does IaaS stand for?", 10);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What does IaaS stand for?" LIMIT 1), "Infrastructure as a Service", 1);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What does IaaS stand for?" LIMIT 1), "Internet as a Service", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What does IaaS stand for?" LIMIT 1), "Integration as a Service", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What does IaaS stand for?" LIMIT 1), "Identity as a Service", 0);

-- Question: What is cloud elasticity?...
INSERT INTO questions (test_id, text, points) VALUES ((SELECT id FROM tests WHERE title = 'Cloud Computing Assessment' LIMIT 1), "What is cloud elasticity?", 10);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is cloud elasticity?" LIMIT 1), "The ability to scale resources up and down automatically", 1);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is cloud elasticity?" LIMIT 1), "The flexibility of cloud pricing", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is cloud elasticity?" LIMIT 1), "The speed of data transfer", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is cloud elasticity?" LIMIT 1), "The security of cloud backups", 0);

-- Question: Which of these is a popular cloud service provider...
INSERT INTO questions (test_id, text, points) VALUES ((SELECT id FROM tests WHERE title = 'Cloud Computing Assessment' LIMIT 1), "Which of these is a popular cloud service provider?", 10);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "Which of these is a popular cloud service provider?" LIMIT 1), "AWS", 1);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "Which of these is a popular cloud service provider?" LIMIT 1), "Adobe", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "Which of these is a popular cloud service provider?" LIMIT 1), "AMD", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "Which of these is a popular cloud service provider?" LIMIT 1), "Apache", 0);

-- Question: What is a 'Region' in cloud computing?...
INSERT INTO questions (test_id, text, points) VALUES ((SELECT id FROM tests WHERE title = 'Cloud Computing Assessment' LIMIT 1), "What is a 'Region' in cloud computing?", 10);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is a 'Region' in cloud computing?" LIMIT 1), "A specific geographical location consisting of multiple data centers", 1);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is a 'Region' in cloud computing?" LIMIT 1), "A software partition within a server", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is a 'Region' in cloud computing?" LIMIT 1), "A type of database storage", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is a 'Region' in cloud computing?" LIMIT 1), "A user group permission level", 0);

-- Question: What is the benefit of serverless computing?...
INSERT INTO questions (test_id, text, points) VALUES ((SELECT id FROM tests WHERE title = 'Cloud Computing Assessment' LIMIT 1), "What is the benefit of serverless computing?", 10);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is the benefit of serverless computing?" LIMIT 1), "Users don't need to manage the underlying server infrastructure", 1);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is the benefit of serverless computing?" LIMIT 1), "Users get a dedicated physical server for free", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is the benefit of serverless computing?" LIMIT 1), "Servers are replaced by local PCs", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is the benefit of serverless computing?" LIMIT 1), "It is always faster than any other method", 0);


-- Test for Deep Learning
INSERT INTO tests (skill_id, title, duration) SELECT id, 'Deep Learning Assessment', 20 FROM skills WHERE name = 'Deep Learning' LIMIT 1;

-- Question: What is an Artificial Neural Network inspired by?...
INSERT INTO questions (test_id, text, points) VALUES ((SELECT id FROM tests WHERE title = 'Deep Learning Assessment' LIMIT 1), "What is an Artificial Neural Network inspired by?", 10);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is an Artificial Neural Network inspired by?" LIMIT 1), "The human brain", 1);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is an Artificial Neural Network inspired by?" LIMIT 1), "Computer microchips", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is an Artificial Neural Network inspired by?" LIMIT 1), "Social networks", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is an Artificial Neural Network inspired by?" LIMIT 1), "Tree structures", 0);

-- Question: What is the role of an activation function in a ne...
INSERT INTO questions (test_id, text, points) VALUES ((SELECT id FROM tests WHERE title = 'Deep Learning Assessment' LIMIT 1), "What is the role of an activation function in a neural network?", 10);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is the role of an activation function in a neural network?" LIMIT 1), "To introduce non-linearity into the model", 1);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is the role of an activation function in a neural network?" LIMIT 1), "To reset the weights to zero", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is the role of an activation function in a neural network?" LIMIT 1), "To increase the number of layers", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is the role of an activation function in a neural network?" LIMIT 1), "To speed up data loading", 0);

-- Question: What does 'Backpropagation' do?...
INSERT INTO questions (test_id, text, points) VALUES ((SELECT id FROM tests WHERE title = 'Deep Learning Assessment' LIMIT 1), "What does 'Backpropagation' do?", 10);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What does 'Backpropagation' do?" LIMIT 1), "Updates the weights of the network based on error", 1);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What does 'Backpropagation' do?" LIMIT 1), "Deletes unnecessary data", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What does 'Backpropagation' do?" LIMIT 1), "Combines multiple networks", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What does 'Backpropagation' do?" LIMIT 1), "Visualizes the model's output", 0);

-- Question: What is a Convolutional Neural Network (CNN) prima...
INSERT INTO questions (test_id, text, points) VALUES ((SELECT id FROM tests WHERE title = 'Deep Learning Assessment' LIMIT 1), "What is a Convolutional Neural Network (CNN) primarily used for?", 10);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is a Convolutional Neural Network (CNN) primarily used for?" LIMIT 1), "Image recognition and processing", 1);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is a Convolutional Neural Network (CNN) primarily used for?" LIMIT 1), "Database management", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is a Convolutional Neural Network (CNN) primarily used for?" LIMIT 1), "Network security", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is a Convolutional Neural Network (CNN) primarily used for?" LIMIT 1), "Audio compression", 0);

-- Question: What is an 'epoch' in training?...
INSERT INTO questions (test_id, text, points) VALUES ((SELECT id FROM tests WHERE title = 'Deep Learning Assessment' LIMIT 1), "What is an 'epoch' in training?", 10);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is an 'epoch' in training?" LIMIT 1), "One complete pass through the entire training dataset", 1);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is an 'epoch' in training?" LIMIT 1), "The time it takes to train one layer", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is an 'epoch' in training?" LIMIT 1), "A single piece of data", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is an 'epoch' in training?" LIMIT 1), "The error rate of the model", 0);


-- Test for Troubleshooting
INSERT INTO tests (skill_id, title, duration) SELECT id, 'Troubleshooting Assessment', 20 FROM skills WHERE name = 'Troubleshooting' LIMIT 1;

-- Question: What is the first step in effective troubleshootin...
INSERT INTO questions (test_id, text, points) VALUES ((SELECT id FROM tests WHERE title = 'Troubleshooting Assessment' LIMIT 1), "What is the first step in effective troubleshooting?", 10);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is the first step in effective troubleshooting?" LIMIT 1), "Problem identification", 1);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is the first step in effective troubleshooting?" LIMIT 1), "Replacing hardware", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is the first step in effective troubleshooting?" LIMIT 1), "Calling for help", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is the first step in effective troubleshooting?" LIMIT 1), "Restarting the system", 0);

-- Question: Why is it important to reproduce an error?...
INSERT INTO questions (test_id, text, points) VALUES ((SELECT id FROM tests WHERE title = 'Troubleshooting Assessment' LIMIT 1), "Why is it important to reproduce an error?", 10);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "Why is it important to reproduce an error?" LIMIT 1), "To confirm the cause and verify the fix", 1);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "Why is it important to reproduce an error?" LIMIT 1), "To show others how bad it is", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "Why is it important to reproduce an error?" LIMIT 1), "To waste time productively", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "Why is it important to reproduce an error?" LIMIT 1), "To fill up log files", 0);

-- Question: What does 'isolating the problem' mean?...
INSERT INTO questions (test_id, text, points) VALUES ((SELECT id FROM tests WHERE title = 'Troubleshooting Assessment' LIMIT 1), "What does 'isolating the problem' mean?", 10);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What does 'isolating the problem' mean?" LIMIT 1), "Narrowing down the cause to a specific component", 1);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What does 'isolating the problem' mean?" LIMIT 1), "Removing the computer from the network", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What does 'isolating the problem' mean?" LIMIT 1), "Ignoring the error", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What does 'isolating the problem' mean?" LIMIT 1), "Protecting other components from damage", 0);

-- Question: Which of these is a common software troubleshootin...
INSERT INTO questions (test_id, text, points) VALUES ((SELECT id FROM tests WHERE title = 'Troubleshooting Assessment' LIMIT 1), "Which of these is a common software troubleshooting technique?", 10);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "Which of these is a common software troubleshooting technique?" LIMIT 1), "Checking log files", 1);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "Which of these is a common software troubleshooting technique?" LIMIT 1), "Buying a new CPU", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "Which of these is a common software troubleshooting technique?" LIMIT 1), "Cleaning the keyboard", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "Which of these is a common software troubleshooting technique?" LIMIT 1), "Reseating RAM", 0);

-- Question: What is documented in a troubleshooting log?...
INSERT INTO questions (test_id, text, points) VALUES ((SELECT id FROM tests WHERE title = 'Troubleshooting Assessment' LIMIT 1), "What is documented in a troubleshooting log?", 10);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is documented in a troubleshooting log?" LIMIT 1), "Symptoms, actions taken, and final solution", 1);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is documented in a troubleshooting log?" LIMIT 1), "Personal opinions of the software", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is documented in a troubleshooting log?" LIMIT 1), "The exact time of every keystroke", 0);
INSERT INTO choices (question_id, text, is_correct) VALUES ((SELECT id FROM questions WHERE text = "What is documented in a troubleshooting log?" LIMIT 1), "A list of everyone who used the system", 0);


