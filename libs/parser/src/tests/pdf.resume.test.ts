/* eslint-disable unicorn/prefer-module */
import * as fs from "node:fs";
// eslint-disable-next-line unicorn/import-style
import * as path from "node:path";

import { beforeAll, describe, expect, it } from "vitest";

// eslint-disable-next-line @nx/enforce-module-boundaries
import PDFParser from "../pdf-import";

// Define a variable to hold the PDF File
let pdfFile: File;

beforeAll(() => {
  // Synchronously read the file from the local filesystem
  const buffer = fs.readFileSync(path.resolve(__dirname, "testassets/resume.pdf"));

  // Convert the buffer into a Blob-like object (This part is specifically for environments that support File API, like browsers. In pure Node.js you'd use buffers directly)
  const blob = new Blob([buffer], { type: "application/pdf" });

  // Convert the Blob into a File
  pdfFile = new File([blob], "resume.pdf", { type: "application/pdf" });
});

describe("Hello World Test", () => {
  it("should return Hello World", () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const helloWorld = () => "Hello World";
    expect(helloWorld()).toBe("Hello World");
  });
});

describe("PDFParser Tests", () => {
  it("should initialize an empty PDFParser object and read the PDF file", async () => {
    const parser = new PDFParser();
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (pdfFile) {
      await parser.readFile(pdfFile);
    } else {
      throw new Error("PDF File is not loaded");
    }
  });
});

// describe("PDFParser functionality", () => {
//   let parser: PDFParser;

//   beforeEach(() => {
//     // Initialize PDFParser before each test
//     parser = new PDFParser();
//   });
// });

//   it("should read a PDF file and return text content", async () => {
//     // Mocking a File object as if it were a PDF file
//     const file = new File([""], "dummy.pdf", { type: "application/pdf" });

//     // Test will fail because readFile is not implemented yet
//     await expect(parser.readFile(file)).resolves.toBeTypeOf("string");
//   });

//   it("should validate extracted text", () => {
//     // Example of data that needs validation
//     const data = "Extracted PDF text";

//     // Test will fail because validate is not implemented yet
//     expect(parser.validate(data)).toBe(true);
//   });

//   it("should convert extracted text to structured data", () => {
//     // Example of extracted text
//     const data = "Extracted PDF text";

//     // Test will fail because convert is not implemented yet
//     expect(parser.convert(data)).toBeInstanceOf(Object);
//   });
