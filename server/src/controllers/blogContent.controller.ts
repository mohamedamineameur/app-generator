
  import BlogContent from '../models/blogContent.model';
  import { blogContentSchema } from '../schemas/blogContent.schema';
  import { validateSchema } from '../utils/validateSchema';
  
  
  export async function createBlogContent(req:any, res:any) {
    try {
      const schema = blogContentSchema().create();
      validateSchema(schema, req.body);
  
      const newBlogContent = await BlogContent.create(req.body);
      res.status(201).json(newBlogContent);
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }


  export async function getAllBlogContents(req:any, res:any) {
    try {
      const items = await BlogContent.findAll();
      res.status(200).json(items);
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }


  export async function getBlogContentById(req:any, res:any) {
    try {
      const schema = blogContentSchema().readById();
      validateSchema(schema, req.body);
  
      const item = await BlogContent.findByPk(req.params.id);
      if (!item) {
        return res.status(404).json({ error: 'BlogContent not found' });
      }
  
      res.status(200).json(item);
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }


  export async function updateBlogContent(req:any, res:any) {
    try {
      const schema = blogContentSchema().update();
      validateSchema(schema, req.body);
  
      const item = await BlogContent.findByPk(req.body.id);
      if (!item) {
        return res.status(404).json({ error: 'BlogContent not found' });
      }
  
      await item.update(req.body);
      res.status(200).json(item);
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }


  export async function deleteBlogContent(req:any, res:any) {
    try {
      const schema = blogContentSchema().destroy();
      validateSchema(schema, req.body);
  
      const item = await BlogContent.findByPk(req.params.id);
      if (!item) {
        return res.status(404).json({ error: 'BlogContent not found' });
      }
  
      await item.destroy();
      res.status(200).json({ message: 'BlogContent deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }
  