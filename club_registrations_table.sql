-- SQL command to create club_registrations table
-- This table stores membership applications for the Electro Scientific Club

CREATE TABLE club_registrations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    
    -- Personal Information
    name VARCHAR(100) NOT NULL,
    family_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    student_card_number VARCHAR(50) NOT NULL UNIQUE,
    gender ENUM('male', 'female') NOT NULL,
    
    -- Academic Information
    year_of_studies ENUM('L1', 'L2', 'L3', 'M1', 'M2') NOT NULL,
    major VARCHAR(100) NOT NULL,
    faculty VARCHAR(150) NOT NULL,
    
    -- Application Details
    motivation TEXT NOT NULL,
    
    -- Application Status (for future use)
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Indexes for better performance
    INDEX idx_email (email),
    INDEX idx_student_card (student_card_number),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);

-- Alternative version with CHECK constraints (for databases that support them like PostgreSQL)
-- Uncomment the following if using PostgreSQL instead of MySQL:


CREATE TABLE club_registrations (
    id SERIAL PRIMARY KEY,
    
    -- Personal Information
    name VARCHAR(100) NOT NULL,
    family_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    student_card_number VARCHAR(50) NOT NULL UNIQUE,
    gender VARCHAR(10) NOT NULL CHECK (gender IN ('male', 'female')),
    
    -- Academic Information
    year_of_studies VARCHAR(5) NOT NULL CHECK (year_of_studies IN ('L1', 'L2', 'L3', 'M1', 'M2')),
    major VARCHAR(100) NOT NULL CHECK (major IN (
        'Science and Technology',
        'Electronics',
        'Electrotechnics', 
        'Electromechanics',
        'Automation',
        'Mechanics',
        'Telecommunication',
        'Other'
    )),
    faculty VARCHAR(150) NOT NULL CHECK (faculty IN (
        'Faculty of Technology',
        'Faculty of Science',
        'Faculty of Hydrocarbons and Chemistry',
        'Faculty of Economics and Science',
        'Faculty of Law',
        'Institute of Electrical and Electronic Engineering',
        'Other'
    )),
    
    -- Application Details
    motivation TEXT NOT NULL,
    
    -- Application Status
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for PostgreSQL
CREATE INDEX idx_email ON club_registrations(email);
CREATE INDEX idx_student_card ON club_registrations(student_card_number);
CREATE INDEX idx_status ON club_registrations(status);
CREATE INDEX idx_created_at ON club_registrations(created_at);
