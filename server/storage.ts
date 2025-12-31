import { db } from "./db";
import { 
  profile, education, experience, projects, skills,
  type Profile, type Education, type Experience, type Project, type Skill,
  type InsertProfile, type InsertEducation, type InsertExperience, type InsertProject, type InsertSkill
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getProfile(): Promise<Profile | undefined>;
  createProfile(profile: InsertProfile): Promise<Profile>;
  
  getEducation(): Promise<Education[]>;
  createEducation(education: InsertEducation): Promise<Education>;
  
  getExperience(): Promise<Experience[]>;
  createExperience(experience: InsertExperience): Promise<Experience>;
  
  getProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  
  getSkills(): Promise<Skill[]>;
  createSkill(skill: InsertSkill): Promise<Skill>;
}

export class DatabaseStorage implements IStorage {
  async getProfile(): Promise<Profile | undefined> {
    const [result] = await db.select().from(profile);
    return result;
  }

  async createProfile(insertProfile: InsertProfile): Promise<Profile> {
    const [result] = await db.insert(profile).values(insertProfile).returning();
    return result;
  }

  async getEducation(): Promise<Education[]> {
    return await db.select().from(education);
  }

  async createEducation(insertEducation: InsertEducation): Promise<Education> {
    const [result] = await db.insert(education).values(insertEducation).returning();
    return result;
  }

  async getExperience(): Promise<Experience[]> {
    return await db.select().from(experience);
  }

  async createExperience(insertExperience: InsertExperience): Promise<Experience> {
    const [result] = await db.insert(experience).values(insertExperience).returning();
    return result;
  }

  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const [result] = await db.insert(projects).values(insertProject).returning();
    return result;
  }

  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills);
  }

  async createSkill(insertSkill: InsertSkill): Promise<Skill> {
    const [result] = await db.insert(skills).values(insertSkill).returning();
    return result;
  }
}

export const storage = new DatabaseStorage();
