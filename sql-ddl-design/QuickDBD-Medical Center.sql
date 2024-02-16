-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/vyOSaz
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "Doctor" (
    "doctor_id" SERIAL   NOT NULL,
    "name" STRING   NOT NULL,
    CONSTRAINT "pk_Doctor" PRIMARY KEY (
        "doctor_id"
     )
);

CREATE TABLE "Patient" (
    "patient_id" SERIAL   NOT NULL,
    "name" STRING   NOT NULL,
    CONSTRAINT "pk_Patient" PRIMARY KEY (
        "patient_id"
     )
);

CREATE TABLE "Visit" (
    "visit_id" SERIAL   NOT NULL,
    "doctor_id" Doctor.doctor_id   NOT NULL,
    "patient_id" Patient.patient_id   NOT NULL,
    "date" DATE   NOT NULL,
    CONSTRAINT "pk_Visit" PRIMARY KEY (
        "visit_id"
     )
);

CREATE TABLE "Diagnosis" (
    "diagnosis_id" SERIAL   NOT NULL,
    "visit_id" Visit.visit_id   NOT NULL,
    "diseaseName" STRING   NOT NULL,
    "diseaseDescription" STRING   NOT NULL,
    CONSTRAINT "pk_Diagnosis" PRIMARY KEY (
        "diagnosis_id"
     )
);

ALTER TABLE "Doctor" ADD CONSTRAINT "fk_Doctor_doctor_id" FOREIGN KEY("doctor_id")
REFERENCES "Visit" ("doctor_id");

ALTER TABLE "Patient" ADD CONSTRAINT "fk_Patient_patient_id" FOREIGN KEY("patient_id")
REFERENCES "Visit" ("patient_id");

ALTER TABLE "Visit" ADD CONSTRAINT "fk_Visit_visit_id" FOREIGN KEY("visit_id")
REFERENCES "Diagnosis" ("visit_id");

