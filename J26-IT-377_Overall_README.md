# Automated Apparel Fabric Differentiation System

## Group Research Project --- J26-IT-377

An IoT-enabled research project exploring automated apparel-fabric
differentiation through sensor data, machine learning, computer vision,
and an integrated monitoring platform.

> **Project status:** This README describes the system architecture,
> member responsibilities, verified development milestones known to the
> team, and proposed next steps. Update progress statements as
> implementation and testing are verified.

------------------------------------------------------------------------

## 1. Project Overview

The project aims to develop an automated system to support fabric
differentiation and inspection in apparel-manufacturing workflows. The
proposed system combines sensor measurements, conveyor-belt fabric
detection, AI-based fabric classification, image-based defect detection,
structured data storage, and a monitoring/decision-support interface.

The system is intended to bring the outputs of these components together
so that data and analysis results can be associated with the relevant
fabric sample.

## 2. Research Objectives

-   Collect fabric-related sensor readings through an IoT sensing subsystem.
-   Detect when fabric passes through the conveyor belt.
-   Explore automated fabric classification using sensor data and AI techniques.
-   Investigate image-based fabric defect detection.
-   Store and manage sensor readings and analysis results in a structured way.
-   Integrate the components through consistent sample identifiers and data formats.
-   Present relevant readings and analysis outputs through a monitoring dashboard.
-   Evaluate the reliability, traceability, and performance of the integrated system.

## 3. Team Members and Component Responsibilities

### Member 1 --- IoT and Hardware Sensing

**Student ID:** IT23318434\
**Name:** N.H.N. Mendis

**Responsibility** - Work with the ESP32-based sensing subsystem. -
Integrate and collect readings from the TCS3200 optical sensor. - Use
the DHT11 sensor to capture ambient temperature and humidity. -
Integrate the ultrasonic sensor to detect when fabric passes through the
conveyor belt. - Prepare sensor messages and publish them through MQTT
for downstream processing. - Support sensor testing, calibration, and
integration.

**Key hardware in this component** - ESP32 - TCS3200 optical sensor -
DHT11 temperature/humidity sensor - Ultrasonic sensor

**Not part of Member 1's hardware allocation:** the webcam is assigned
to Member 3's computer-vision component. The FDC1004 capacitive sensor
is not used in the current design.

**Expected output:** Sensor readings and fabric-passage detection events
provided to the data platform.

### Member 2 --- Real-Time Fabric Data Management and Integration

**Student ID:** IT23290624\
**Name:** M.D.A. Ariyaratna

**Responsibility** - Receive sensor data through MQTT. - Validate
incoming messages and standardize field names, timestamps, and sample
identifiers. - Store sensor readings and system outputs in a structured
database. - Support historical data retrieval and API-based access. -
Integrate AI classification and defect-detection results with the
corresponding sample. - Provide reliable data to the frontend and
support end-to-end traceability. - Test data quality, storage
reliability, and integration performance.

**Known development milestones** - Node-RED workflow established for
data processing. - MQTT input and payload validation/standardization
implemented. - Local SQLite insertion and retrieval tested using
software test data. - A Node-RED-to-Neon DB connection has been
established; full cloud read/write behaviour and end-to-end operation
should be marked complete only after verification.

**Expected output:** A validated, queryable, sample-centred data layer
connecting sensing, analysis, and monitoring.

### Member 3 --- AI and Computer Vision

**Student ID:** IT23288058\
**Name:** To be confirmed from the team's official records.

**Responsibility** - Investigate and implement AI-based fabric
classification. - Develop image-based fabric defect-detection methods. -
Use the webcam as part of the computer-vision setup. - Define the
expected inputs and outputs for classification and defect detection. -
Coordinate with Member 2 on sample identifiers and the format of model
results. - Evaluate model performance using appropriate labelled data
and metrics.

**Expected output:** Fabric-classification predictions and image-based
defect-detection results that can be linked to the relevant fabric
sample.

**Status note:** Specific model architectures, accuracy results, and
implementation milestones should be added only when confirmed by Member
3.

### Member 4 --- Frontend Monitoring and Decision-Support Platform

**Student ID:** IT23362512\
**Name:** To be confirmed from the team's official records.

**Responsibility** - Develop the user-facing monitoring dashboard. -
Display available sensor readings and fabric sample information. -
Present classification and defect-detection results when supplied by the
backend. - Support sample-history views and status indicators. -
Coordinate with Member 2 on API contracts, data fields, and refresh
behaviour. - Test usability and verify that displayed information
corresponds to the correct sample.

**Expected output:** A clear monitoring and decision-support interface
for viewing sensor data and analysis results.

**Status note:** Specific frontend frameworks, implemented screens, and
completion milestones should be added only when confirmed by Member 4.

------------------------------------------------------------------------

## 4. Proposed System Architecture

``` text
                 FABRIC ON CONVEYOR BELT
                           |
                           v
              IoT AND HARDWARE SENSING
       ESP32 + TCS3200 + DHT11 + Ultrasonic
                           |
                           | MQTT
                           v
                      MQTT BROKER
                           |
                           v
                     NODE-RED FLOW
              Validation and standardization
                           |
                           v
                    DATA MANAGEMENT
               SQLite for local testing /
                  Neon DB cloud storage
                           |
               +-----------+-----------+
               |                       |
               v                       v
       AI / COMPUTER VISION       API / DATA ACCESS
       Webcam and image analysis  Sample data and history
       Fabric classification             |
       Defect detection                  |
               |                         |
               +------------+------------+
                            |
                            v
                  FRONTEND DASHBOARD
             Monitoring and decision support
```

This is a logical architecture. The exact deployment, API routes,
database schema, and communication paths should reflect the
implementation that is actually completed.

## 5. Shared Data and Integration Requirements

To connect the four components, the team should agree on a shared data
contract.

-   **Sample identifier:** a consistent ID for each fabric sample across
    sensing, AI, defect detection, database storage, and the dashboard.
-   **Timestamps:** distinguish the sensor/event timestamp from the
    server's received timestamp.
-   **Sensor fields:** agree on field names, units, numeric types, and
    valid ranges for each sensor.
-   **Fabric classification output:** define the predicted class and,
    where available, confidence score and model version.
-   **Defect detection output:** define defect labels, relevant image or
    image reference, and any location/severity information supported by
    the model.
-   **Status and errors:** use consistent representations for pending,
    successful, failed, or unavailable results.
-   **Validation:** reject or flag malformed records and preserve enough
    information for troubleshooting.
-   **Data ownership:** agree which component creates each field and
    which component is responsible for updating it.

Only include fields supported by the final hardware and software design.
The current hardware plan excludes the FDC1004 capacitive sensor.

## 6. Research Contribution and Potential Novelty

### Proposed contribution: an integrated, sample-centred fabric-analysis workflow

The potential contribution is to combine multiple sources of
information---IoT sensor readings, AI-based fabric classification, and
image-based defect detection---within one traceable workflow for each
fabric sample.

Possible research contributions include:

1.  **Sample-level traceability:** linking sensor readings and analysis
    results to the same sample throughout the pipeline.
2.  **Combined evidence:** making sensor-derived information and
    computer-vision results available together for inspection and future
    analysis.
3.  **Data quality and reliability:** validating incoming messages and
    evaluating how reliably information moves from sensing to storage
    and display.
4.  **Real-time integration:** investigating the delays and failure
    points between sensor publishing, processing, persistence, analysis,
    and visualization.
5.  **Historical analysis:** retaining structured records to support
    future investigation of sensor patterns, classification outputs, and
    detected defects.

These are proposed contributions, not proof of novelty by themselves.
The team should review related research, identify a specific research
gap, and evaluate the proposed approach experimentally before making
claims that it is novel compared with existing systems.

## 7. Evaluation Plan

Potential evaluation measures include:

  -----------------------------------------------------------------------
  Area                                Possible evaluation
  ----------------------------------- -----------------------------------
  Sensor subsystem                    Reading consistency and sensor
                                      response to fabric passage

  Fabric classification               Suitable classification metrics on
                                      labelled test data

  Defect detection                    Appropriate detection metrics on
                                      labelled images

  Data validation                     Correct handling of valid and
                                      invalid payloads

  Data storage                        Successful writes and reads,
                                      including cloud verification

  Sample traceability                 Correct association of outputs with
                                      sample IDs

  Integration latency                 Time between message receipt and
                                      persistence or display

  Reliability                         Behaviour during duplicate
                                      messages, missing fields, and
                                      connection interruptions

  Dashboard                           Correctness and usability of
                                      displayed sample information
  -----------------------------------------------------------------------

Use measured results from actual tests. Do not report unverified
accuracy, speed, or reliability figures.

## 8. Development Status and Next Steps

### Known milestones

-   Member 2 has implemented a Node-RED validation/standardization flow and tested local SQLite insertion and retrieval using software test data.
-   A Node-RED-to-Neon DB connection has been established, with full cloud read/write verification still to be confirmed.
-   The hardware plan includes the ESP32, TCS3200, DHT11, and ultrasonic sensor.
-   The webcam belongs to Member 3's computer-vision component.

### Team next steps

-   Verify physical sensor readings and conveyor-passage detection.
-   Publish actual sensor data through MQTT and validate the full ingestion path.
-   Verify database writes and reads through the Node-RED-to-Neon DB connection.
-   Agree on sample IDs and data formats across all members.
-   Implement and evaluate fabric classification and image-based defect detection.
-   Complete the API and dashboard integration.
-   Run end-to-end tests using known fabric samples.
-   Collect experimental results and document limitations.
-   Review related literature and refine the research gap and novelty claim.

Update this section as each milestone is completed and evidenced.

## 9. Collaboration and Interfaces

  -----------------------------------------------------------------------
  From                    To                      Information exchanged
  ----------------------- ----------------------- -----------------------
  Member 1: IoT sensing   Member 2: Data          Sensor readings and
                          integration             fabric-passage events
                                                  via MQTT

  Member 2: Data          Member 3: AI/computer   Sample identifiers and
  integration             vision                  relevant stored data,
                                                  as agreed

  Member 3: AI/computer   Member 2: Data          Fabric classifications
  vision                  integration             and defect-detection
                                                  results

  Member 2: Data          Member 4: Frontend      Validated sensor data,
  integration                                     sample history, and
                                                  analysis results
                                                  through agreed
                                                  interfaces

  Member 4: Frontend      Whole team              Integration feedback,
                                                  display issues, and
                                                  user-facing
                                                  requirements
  -----------------------------------------------------------------------

The exact communication direction and mechanism may be refined as the
implementation evolves.

## 10. Hardware and Scope Clarifications

-   The FDC1004 capacitive sensor is **not used** and should not appear in the current hardware list, data schema, diagrams, or progress claims.
-   The ultrasonic sensor is included to detect when fabric passes through the conveyor belt.
-   The webcam belongs to **Member 3's computer-vision component**, not Member 1.
-   The DHT11 measures ambient temperature and humidity; do not describe it as directly measuring fabric moisture.
-   Software-generated test data must be distinguished from readings collected from physical sensors.
-   A database connection must not be described as fully integrated cloud storage until actual writes and reads have been tested.

## 11. Conclusion

The Automated Apparel Fabric Differentiation System brings together IoT
sensing, AI and computer vision, data management, and frontend
monitoring. The four components have distinct responsibilities but
depend on shared sample identifiers, consistent data formats, and
verified integration. The research will be strengthened by demonstrating
the complete workflow with real fabric samples and reporting measured
results for classification, defect detection, traceability, reliability,
and performance.
