# Legacy COBOL Accounting System - Test Plan

## Overview

This comprehensive test plan validates the business logic and behavior of the legacy COBOL accounting application (Merrington High School system) prior to transitioning to Node.js.

## Test Cases

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status (Pass/Fail) | Comments |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-001** | View Current Account Balance (`TOTAL`) | COBOL application compiled and running; account initialized. | 1. Launch application.<br>2. Select Option `1` (View Balance).<br>3. Verify displayed output. | System invokes `operations.cob` with action `TOTAL`, retrieves balance from `data.cob`, and displays current balance. | Current balance displayed successfully. | Pass | Core read-only operation verified. |
| **TC-002** | Credit Account with Valid Amount (`CREDIT`) | User at main menu; known starting balance. | 1. Select Option `2` (Credit Account).<br>2. Input credit amount (e.g., `100.00`).<br>3. Confirm submission.<br>4. Select Option `1` to verify new balance. | System calls `operations.cob` with `CREDIT`, adds amount to existing balance in `data.cob`, and confirms update. Balance increases by `100.00`. | Balance increased by credit amount. | Pass | Validated credit transaction logic. |
| **TC-003** | Debit Account with Valid Amount (`DEBIT`) | Current balance is greater than debit amount. | 1. Select Option `3` (Debit Account).<br>2. Input debit amount (e.g., `50.00`).<br>3. Confirm submission.<br>4. Select Option `1` to check balance. | System calls `operations.cob` with `DEBIT`, deducts amount from balance in `data.cob`, and confirms transaction. Balance decreases by `50.00`. | Balance decreased by debit amount. | Pass | Validated debit transaction logic. |
| **TC-004** | Debit Account with Zero Amount | User at main menu; valid balance exists. | 1. Select Option `3` (Debit Account).<br>2. Input amount `0.00`.<br>3. Submit. | Balance remains unchanged; system handles non-positive values cleanly without corrupting state. | Balance unchanged. | Pass | Boundary testing for zero amount. |
| **TC-005** | Exit Application | User at main menu. | 1. Select Option `4` (Exit). | Application gracefully terminates execution loop in `main.cob` and returns control to terminal. | Application exits cleanly. | Pass | Menu loop termination check. |
