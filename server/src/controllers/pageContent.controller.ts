
  import PageContent from '../models/pageContent.model';
  import { pageContentSchema } from '../schemas/pageContent.schema';
  import { validateSchema } from '../utils/validateSchema';
  
  
  export async function createPageContent(req:any, res:any) {
    try {
      const schema = pageContentSchema().create();
      validateSchema(schema, req.body);
  
      const newPageContent = await PageContent.create(req.body);
      res.status(201).json(newPageContent);
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }


  export async function getAllPageContents(req:any, res:any) {
    try {
      const items = await PageContent.findAll();
      res.status(200).json(items);
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }


  export async function getPageContentById(req:any, res:any) {
    try {
      const schema = pageContentSchema().readById();
      validateSchema(schema, req.body);
  
      const item = await PageContent.findByPk(req.params.id);
      if (!item) {
        return res.status(404).json({ error: 'PageContent not found' });
      }
  
      res.status(200).json(item);
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }


  export async function updatePageContent(req:any, res:any) {
    try {
      const schema = pageContentSchema().update();
      validateSchema(schema, req.body);
  
      const item = await PageContent.findByPk(req.body.id);
      if (!item) {
        return res.status(404).json({ error: 'PageContent not found' });
      }
  
      await item.update(req.body);
      res.status(200).json(item);
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }


  export async function deletePageContent(req:any, res:any) {
    try {
      const schema = pageContentSchema().destroy();
      validateSchema(schema, req.body);
  
      const item = await PageContent.findByPk(req.params.id);
      if (!item) {
        return res.status(404).json({ error: 'PageContent not found' });
      }
  
      await item.destroy();
      res.status(200).json({ message: 'PageContent deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }
  