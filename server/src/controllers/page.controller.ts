
  import Page from '../models/page.model';
  import { pageSchema } from '../schemas/page.schema';
  import { validateSchema } from '../utils/validateSchema';
  
  
  export async function createPage(req:any, res:any) {
    try {
      const schema = pageSchema().create();
      validateSchema(schema, req.body);
  
      const newPage = await Page.create(req.body);
      res.status(201).json(newPage);
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }


  export async function getAllPages(req:any, res:any) {
    try {
      const items = await Page.findAll({
        where: { isPublished: true }
      });
      res.status(200).json(items);
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }


  export async function getPageById(req:any, res:any) {
    try {
      const schema = pageSchema().readById();
      validateSchema(schema, req.body);
  
      const item = await Page.findByPk(req.params.id);
      if (!item) {
        return res.status(404).json({ error: 'Page not found' });
      }
      if (!item.isPublished) {
        return res.status(403).json({ error: 'Page is not published' });
      }
      res.status(200).json(item);
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }


  export async function updatePage(req:any, res:any) {
    try {
      const schema = pageSchema().update();
      validateSchema(schema, req.body);
  
      const item = await Page.findByPk(req.body.id);
      if (!item) {
        return res.status(404).json({ error: 'Page not found' });
      }
  
      await item.update(req.body);
      res.status(200).json(item);
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }


  export async function deletePage(req:any, res:any) {
    try {
      const schema = pageSchema().destroy();
      validateSchema(schema, req.body);
  
      const item = await Page.findByPk(req.params.id);
      if (!item) {
        return res.status(404).json({ error: 'Page not found' });
      }
  
      await item.destroy();
      res.status(200).json({ message: 'Page deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }
  