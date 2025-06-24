
  import BlogMiniature from '../models/blogMiniature.model';
  import { blogMiniatureSchema } from '../schemas/blogMiniature.schema';
  import { validateSchema } from '../utils/validateSchema';
  
  
  export async function createBlogMiniature(req:any, res:any) {
    try {
      const schema = blogMiniatureSchema().create();
      validateSchema(schema, req.body);
  
      const newBlogMiniature = await BlogMiniature.create(req.body);
      res.status(201).json(newBlogMiniature);
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }


  export async function getAllBlogMiniatures(req:any, res:any) {
    try {
      const items = await BlogMiniature.findAll();
      res.status(200).json(items);
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }


  export async function getBlogMiniatureById(req:any, res:any) {
    try {
      const schema = blogMiniatureSchema().readById();
      validateSchema(schema, req.body);
  
      const item = await BlogMiniature.findByPk(req.params.id);
      if (!item) {
        return res.status(404).json({ error: 'BlogMiniature not found' });
      }
  
      res.status(200).json(item);
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }


  export async function updateBlogMiniature(req:any, res:any) {
    try {
      const schema = blogMiniatureSchema().update();
      validateSchema(schema, req.body);
  
      const item = await BlogMiniature.findByPk(req.body.id);
      if (!item) {
        return res.status(404).json({ error: 'BlogMiniature not found' });
      }
  
      await item.update(req.body);
      res.status(200).json(item);
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }


  export async function deleteBlogMiniature(req:any, res:any) {
    try {
      const schema = blogMiniatureSchema().destroy();
      validateSchema(schema, req.body);
  
      const item = await BlogMiniature.findByPk(req.params.id);
      if (!item) {
        return res.status(404).json({ error: 'BlogMiniature not found' });
      }
  
      await item.destroy();
      res.status(200).json({ message: 'BlogMiniature deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }
  