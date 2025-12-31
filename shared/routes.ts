import { z } from 'zod';
import { 
  insertProfileSchema, 
  insertEducationSchema, 
  insertExperienceSchema, 
  insertProjectSchema, 
  insertSkillSchema,
  profile, education, experience, projects, skills 
} from './schema';

export const api = {
  profile: {
    get: {
      method: 'GET' as const,
      path: '/api/profile',
      responses: {
        200: z.custom<typeof profile.$inferSelect>(),
        404: z.object({ message: z.string() }),
      },
    },
  },
  education: {
    list: {
      method: 'GET' as const,
      path: '/api/education',
      responses: {
        200: z.array(z.custom<typeof education.$inferSelect>()),
      },
    },
  },
  experience: {
    list: {
      method: 'GET' as const,
      path: '/api/experience',
      responses: {
        200: z.array(z.custom<typeof experience.$inferSelect>()),
      },
    },
  },
  projects: {
    list: {
      method: 'GET' as const,
      path: '/api/projects',
      responses: {
        200: z.array(z.custom<typeof projects.$inferSelect>()),
      },
    },
  },
  skills: {
    list: {
      method: 'GET' as const,
      path: '/api/skills',
      responses: {
        200: z.array(z.custom<typeof skills.$inferSelect>()),
      },
    },
  },
  contact: {
    send: {
      method: 'POST' as const,
      path: '/api/contact',
      input: z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email address"),
        message: z.string().min(1, "Message is required"),
      }),
      responses: {
        200: z.object({ message: z.string() }),
        400: z.object({ message: z.string(), field: z.string().optional() }),
      },
    }
  }
};
