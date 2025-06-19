
  import Content from '../models/content.model';
  import { contentSchema } from '../schemas/content.schema';
  import { validateSchema } from '../utils/validateSchema';
  
  
  export async function createContent(req:any, res:any) {
    try {
      const schema = contentSchema().create();
      validateSchema(schema, req.body);
  
      const newContent = await Content.create(req.body);
      res.status(201).json(newContent);
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }


  export async function getAllContents(req:any, res:any) {
    try {
      const items = await Content.findAll({
        where: { isPublished: true }
      });
      res.status(200).json(items);
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }

export async function getAllContentsManager(req:any, res:any) {
    try {
      const items = await Content.findAll();
      res.status(200).json(items);
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }


  export async function getContentById(req:any, res:any) {
    try {
      const schema = contentSchema().readById();
      validateSchema(schema, req.body);
  
      const item = await Content.findByPk(req.params.id);
      if (!item) {
        return res.status(404).json({ error: 'Content not found' });
      }
      if (!item.isPublished) {
        return res.status(403).json({ error: 'Content is not published' });
      }
  
      res.status(200).json(item);
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }

export async function getContentByIdManage(req:any, res:any) {
    try {
      const schema = contentSchema().readById();
      validateSchema(schema, req.body);
  
      const item = await Content.findByPk(req.params.id);
      if (!item) {
        return res.status(404).json({ error: 'Content not found' });
      }
  
      res.status(200).json(item);
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }


  export async function updateContent(req:any, res:any) {
    try {
      const schema = contentSchema().update();
      validateSchema(schema, req.body);
  
      const item = await Content.findByPk(req.body.id);
      if (!item) {
        return res.status(404).json({ error: 'Content not found' });
      }
  
      await item.update(req.body);
      res.status(200).json(item);
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }


  export async function deleteContent(req:any, res:any) {
    try {
      const schema = contentSchema().destroy();
      validateSchema(schema, req.body);
  
      const item = await Content.findByPk(req.params.id);
      if (!item) {
        return res.status(404).json({ error: 'Content not found' });
      }
  
      await item.destroy();
      res.status(200).json({ message: 'Content deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }
  