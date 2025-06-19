
  import Blog from '../models/blog.model';
  import { blogSchema } from '../schemas/blog.schema';
  import { validateSchema } from '../utils/validateSchema';
  
  
  export async function createBlog(req:any, res:any) {
    try {
      const schema = blogSchema().create();
      validateSchema(schema, req.body);
  
      const newBlog = await Blog.create(req.body);
      res.status(201).json(newBlog);
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }


  export async function getAllBlogs(req:any, res:any) {
    try {
      const items = await Blog.findAll({where: { isPublished: true }});
      res.status(200).json(items);
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }
  export async function getAllblogsManager(req:any, res:any) {
    try {
      const items = await Blog.findAll();
      res.status(200).json(items);
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });
    }
  }
  


  export async function getBlogById(req:any, res:any) {
    try {
      const schema = blogSchema().readById();
      
  
      const item = await Blog.findByPk(req.params.id);
      if (!item) {
        return res.status(404).json({ error: 'Blog not found' });
      }
      if (!item.isPublished) {
        return res.status(403).json({ error: 'Blog is not published' });
      }
  
      res.status(200).json(item);
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }

  export async function getBlogByIdManage(req:any, res:any) {
    try {
      const schema = blogSchema().readById();
      
  
      const item = await Blog.findByPk(req.params.id);
      if (!item) {
        return res.status(404).json({ error: 'Blog not found' });
      }
     
  
      res.status(200).json(item);
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }


  export async function updateBlog(req:any, res:any) {
    try {
      const schema = blogSchema().update();
      validateSchema(schema, req.body);
  
      const item = await Blog.findByPk(req.body.id);
      if (!item) {
        return res.status(404).json({ error: 'Blog not found' });
      }
  
      await item.update(req.body);
      res.status(200).json(item);
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }


  export async function deleteBlog(req:any, res:any) {
    try {
      const schema = blogSchema().destroy();
  
      const item = await Blog.findByPk(req.params.id);
      if (!item) {
        return res.status(404).json({ error: 'Blog not found' });
      }
  
      await item.destroy();
      res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }
  