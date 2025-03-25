-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Term_project
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Term_project
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Term_project` DEFAULT CHARACTER SET utf8 ;
USE `Term_project` ;

-- -----------------------------------------------------
-- Table `Term_project`.`Medical_Specialty`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Term_project`.`Medical_Specialty` (
  `Department_ID` INT NOT NULL,
  `Department_Name` VARCHAR(45) NULL,
  `Phone_number` VARCHAR(45) NULL,
  PRIMARY KEY (`Department_ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Term_project`.`Doctor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Term_project`.`Doctor` (
  `Doctor_ID` INT NOT NULL,
  `Password` VARCHAR(45) NOT NULL,
  `Name` VARCHAR(45) NULL,
  `Address` VARCHAR(45) NULL,
  `Phone_number` VARCHAR(45) NULL,
  `Medical_Specialty_Department_ID` INT NULL,
  PRIMARY KEY (`Doctor_ID`),
  INDEX `fk_Doctor_Medical_Specialty1_idx` (`Medical_Specialty_Department_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Doctor_Medical_Specialty1`
    FOREIGN KEY (`Medical_Specialty_Department_ID`)
    REFERENCES `Term_project`.`Medical_Specialty` (`Department_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Term_project`.`Nurse`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Term_project`.`Nurse` (
  `Nurse_ID` INT NOT NULL,
  `Password` VARCHAR(45) NOT NULL,
  `Name` VARCHAR(45) NULL,
  `Address` VARCHAR(45) NULL,
  `Phone_number` VARCHAR(45) NULL,
  `Medical_Specialty_Department_ID` INT NULL,
  PRIMARY KEY (`Nurse_ID`),
  INDEX `fk_Nurse_Medical_Specialty1_idx` (`Medical_Specialty_Department_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Nurse_Medical_Specialty1`
    FOREIGN KEY (`Medical_Specialty_Department_ID`)
    REFERENCES `Term_project`.`Medical_Specialty` (`Department_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Term_project`.`Patient`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Term_project`.`Patient` (
  `Patient_ID` INT NOT NULL,
  `Name` VARCHAR(45) NULL,
  `SSN` VARCHAR(45) NULL,
  `Password` VARCHAR(45) NOT NULL,
  `Address` VARCHAR(45) NULL,
  `Gender` VARCHAR(45) NULL,
  `Blood_Type` VARCHAR(45) NULL,
  `Height` VARCHAR(45) NULL,
  `Weight` VARCHAR(45) NULL,
  `Phone_number` VARCHAR(45) NULL,
  `Doctor_Doctor_ID` INT NULL,
  `Nurse_Nurse_ID` INT NULL,
  PRIMARY KEY (`Patient_ID`),
  INDEX `fk_Patient_Doctor1_idx` (`Doctor_Doctor_ID` ASC) VISIBLE,
  INDEX `fk_Patient_Nurse1_idx` (`Nurse_Nurse_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Patient_Doctor1`
    FOREIGN KEY (`Doctor_Doctor_ID`)
    REFERENCES `Term_project`.`Doctor` (`Doctor_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Patient_Nurse1`
    FOREIGN KEY (`Nurse_Nurse_ID`)
    REFERENCES `Term_project`.`Nurse` (`Nurse_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Term_project`.`Inpatient`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Term_project`.`Inpatient` (
  `Room_ID` INT NOT NULL,
  `Admission_Date_Time` DATETIME(6) NULL,
  `Discharge_Date_Time` DATETIME(6) NULL,
  `Patient_Patient_ID` INT NOT NULL,
  PRIMARY KEY (`Patient_Patient_ID`),
  INDEX `fk_Inpatient_Patient_idx` (`Patient_Patient_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Inpatient_Patient`
    FOREIGN KEY (`Patient_Patient_ID`)
    REFERENCES `Term_project`.`Patient` (`Patient_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Term_project`.`Reservation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Term_project`.`Reservation` (
  `Reservation_number` INT NOT NULL,
  `Reservation_Date_Time` DATETIME(6) NULL,
  `Medical_Specialty_Department_ID` INT NULL,
  `Patient_Patient_ID` INT NULL,
  PRIMARY KEY (`Reservation_number`),
  INDEX `fk_Reservation_Medical_Specialty1_idx` (`Medical_Specialty_Department_ID` ASC) VISIBLE,
  INDEX `fk_Reservation_Patient1_idx` (`Patient_Patient_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Reservation_Medical_Specialty1`
    FOREIGN KEY (`Medical_Specialty_Department_ID`)
    REFERENCES `Term_project`.`Medical_Specialty` (`Department_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Reservation_Patient1`
    FOREIGN KEY (`Patient_Patient_ID`)
    REFERENCES `Term_project`.`Patient` (`Patient_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Term_project`.`Examination`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Term_project`.`Examination` (
  `Examination_number` INT NOT NULL,
  `Examination_Date_Time` DATETIME(6) NULL,
  `Examination_Details` VARCHAR(45) NULL,
  `Doctor_Doctor_ID` INT NULL,
  `Patient_Patient_ID` INT NULL,
  PRIMARY KEY (`Examination_number`),
  INDEX `fk_Examination_Doctor1_idx` (`Doctor_Doctor_ID` ASC) VISIBLE,
  INDEX `fk_Examination_Patient1_idx` (`Patient_Patient_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Examination_Doctor1`
    FOREIGN KEY (`Doctor_Doctor_ID`)
    REFERENCES `Term_project`.`Doctor` (`Doctor_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Examination_Patient1`
    FOREIGN KEY (`Patient_Patient_ID`)
    REFERENCES `Term_project`.`Patient` (`Patient_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Term_project`.`Treatment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Term_project`.`Treatment` (
  `Treatment_number` INT NOT NULL,
  `Treatment_Date_Time` DATETIME(6) NULL,
  `Treatment_Details` VARCHAR(45) NULL,
  `Nurse_Nurse_ID` INT NULL,
  `Patient_Patient_ID` INT NULL,
  PRIMARY KEY (`Treatment_number`),
  INDEX `fk_Treatment_Nurse1_idx` (`Nurse_Nurse_ID` ASC) VISIBLE,
  INDEX `fk_Treatment_Patient1_idx` (`Patient_Patient_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Treatment_Nurse1`
    FOREIGN KEY (`Nurse_Nurse_ID`)
    REFERENCES `Term_project`.`Nurse` (`Nurse_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Treatment_Patient1`
    FOREIGN KEY (`Patient_Patient_ID`)
    REFERENCES `Term_project`.`Patient` (`Patient_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
