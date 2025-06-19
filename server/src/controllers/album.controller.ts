
  import Album from '../models/album.model';
  import { albumSchema } from '../schemas/album.schema';
  import { validateSchema } from '../utils/validateSchema';
  
  
  export async function createAlbum(req:any, res:any) {
    try {
      const schema = albumSchema().create();
      validateSchema(schema, req.body);
  
      const newAlbum = await Album.create(req.body);
      res.status(201).json(newAlbum);
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }


  export async function getAllAlbums(req:any, res:any) {
    try {
      const items = await Album.findAll({
        where: {
          isPublished: true 
        }
      });
      res.status(200).json(items);
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }


  export async function getAlbumById(req:any, res:any) {
    try {
      const schema = albumSchema().readById();
      validateSchema(schema, req.body);
  
      const item = await Album.findByPk(req.params.id);
      if (!item) {
        return res.status(404).json({ error: 'Album not found' });
      }
      if (!item.isPublished) {
        return res.status(403).json({ error: 'Album is not published' });
      }
  
      res.status(200).json(item);
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }


  export async function updateAlbum(req:any, res:any) {
    try {
      const schema = albumSchema().update();
      validateSchema(schema, req.body);
  
      const item = await Album.findByPk(req.body.id);
      if (!item) {
        return res.status(404).json({ error: 'Album not found' });
      }
  
      await item.update(req.body);
      res.status(200).json(item);
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }


  export async function deleteAlbum(req:any, res:any) {
    try {
      const schema = albumSchema().destroy();
      validateSchema(schema, req.body);
  
      const item = await Album.findByPk(req.params.id);
      if (!item) {
        return res.status(404).json({ error: 'Album not found' });
      }
  
      await item.destroy();
      res.status(200).json({ message: 'Album deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }

  export async function getAllAlbumsManage(req:any, res:any) {
    try {
      const items = await Album.findAll();
      res.status(200).json(items);
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }
  export async function getAlbumByIdManage(req:any, res:any) {
    try {
      const schema = albumSchema().readById();
      validateSchema(schema, req.body);
  
      const item = await Album.findByPk(req.params.id);
      if (!item) {
        return res.status(404).json({ error: 'Album not found' });
      }
  
      res.status(200).json(item);
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }
  