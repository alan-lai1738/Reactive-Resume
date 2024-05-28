import { createId } from "@paralleldrive/cuid2";
import {
  defaultAward,
  defaultCertification,
  defaultEducation,
  defaultExperience,
  defaultInterest,
  defaultLanguage,
  defaultProfile,
  defaultPublication,
  defaultReference,
  defaultResumeData,
  defaultSkill,
  defaultVolunteer,
} from "@reactive-resume/schema";
import { Json } from "@reactive-resume/utils";
import { Schema } from "zod";
import { PDFDocument } from "pdf-lib";
import fs from "fs";
import { Parser } from "../interfaces/parser";
import { PDFResume, pdfResumeSchema } from "./schema";

export * from "./schema";

export class PDFParser implements Parser<PDFDocument, PDFResume> {
  schema: Schema;

  constructor() {
    this.schema = pdfResumeSchema;
  }

  async readFile(file: File): Promise<PDFDocument> {
    const fileAsBytes = await this.fileToUint8Array(file);
    const data = await PDFDocument.load(fileAsBytes);

    return data;
  }

  async fileToUint8Array(file: File): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const uint8Array = new Uint8Array(arrayBuffer);
        resolve(uint8Array);
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsArrayBuffer(file);
    });
  }

  // validate(data: PDFDocument) {
  //   // return this.schema.parse(data) as PDFResume;
  //   return null;
  // }

  // convert(data: PDFResume) {
  //   return null;
  // }
}
