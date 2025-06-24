
  import AlbumMiniature from '../models/albumMiniature.model';
  import { albumMiniatureSchema } from '../schemas/albumMiniature.schema';
  import { validateSchema } from '../utils/validateSchema';
  
  
  export async function createAlbumMiniature(req:any, res:any) {
    try {
      const schema = albumMiniatureSchema().create();
      validateSchema(schema, req.body);
  
      const newAlbumMiniature = await AlbumMiniature.create(req.body);
      res.status(201).json(newAlbumMiniature);
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }


  export async function getAllAlbumMiniatures(req:any, res:any) {
    try {
      const items = await AlbumMiniature.findAll();
      res.status(200).json(items);
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }


  export async function getAlbumMiniatureById(req:any, res:any) {
    try {
      const schema = albumMiniatureSchema().readById();
      validateSchema(schema, req.body);
  
      const item = await AlbumMiniature.findByPk(req.params.id);
      if (!item) {
        return res.status(404).json({ error: 'AlbumMiniature not found' });
      }
  
      res.status(200).json(item);
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }


  export async function updateAlbumMiniature(req:any, res:any) {
    try {
      const schema = albumMiniatureSchema().update();
      validateSchema(schema, req.body);
  
      const item = await AlbumMiniature.findByPk(req.body.id);
      if (!item) {
        return res.status(404).json({ error: 'AlbumMiniature not found' });
      }
  
      await item.update(req.body);
      res.status(200).json(item);
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }


  export async function deleteAlbumMiniature(req:any, res:any) {
    try {
      const schema = albumMiniatureSchema().destroy();
      validateSchema(schema, req.body);
  
      const item = await AlbumMiniature.findByPk(req.params.id);
      if (!item) {
        return res.status(404).json({ error: 'AlbumMiniature not found' });
      }
  
      await item.destroy();
      res.status(200).json({ message: 'AlbumMiniature deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }
  