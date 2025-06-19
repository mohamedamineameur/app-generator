  import Picture from '../models/picture.model';
  import { pictureSchema } from '../schemas/picture.schema';
  import { validateSchema } from '../utils/validateSchema';
  import { faker } from "@faker-js/faker";
  import { Album} from '../models/album.model';
  
  export async function createPicture(req:any, res:any) {
    try {
      const schema = pictureSchema().create();
      validateSchema(schema, req.body);
      const pictureUrl = faker.image.url();
      const picture = {
        ...req.body,
        url: pictureUrl, 
      };
      const newPicture = await Picture.create(picture);
      res.status(201).json(newPicture);
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }


  export async function getAllPictures(req: any, res: any) {
    try {
      const items = await Picture.findAll({
        where: {
          isPublished: true,
        },
        
      });
      const albums = await Album.findAll({
        where: {
          isPublished: true,
        },
      });
      const Items = items.filter((item: any) =>
        albums.some((album: any) => album.id === item.albumId)
      );
      
  
      res.status(200).json(Items);
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  }
  export async function getAllPicturesManage(req:any, res:any) {
    try {
      const items = await Picture.findAll();
      res.status(200).json(items);
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }


export async function getPictureById(req: any, res: any) {
  try {
    const schema = pictureSchema().readById();
    validateSchema(schema, req.body);

    const item = await Picture.findByPk(req.params.id, {
      include: [
        {
          model: Album,
          as: "album",
          attributes: [], // supprime cette ligne si tu veux inclure les infos de l'album
        },
      ],
    });

    if (!item) {
      return res.status(404).json({ error: "Picture not found" });
    }

    const album = await Album.findByPk(item.albumId);
    if (!item.isPublished || !album?.isPublished) {
      return res.status(403).json({ error: "Picture or album is not published" });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
}

  export async function getPictureByIdManage(req:any, res:any) {
    try {
      const schema = pictureSchema().readById();
      validateSchema(schema, req.body);
  
      const item = await Picture.findByPk(req.params.id);
      if (!item) {
        return res.status(404).json({ error: 'Picture not found' });
      }
  
      res.status(200).json(item);
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }


  export async function updatePicture(req:any, res:any) {
    try {
      const schema = pictureSchema().update();
      validateSchema(schema, req.body);
  
      const item = await Picture.findByPk(req.body.id);
      if (!item) {
        return res.status(404).json({ error: 'Picture not found' });
      }
  
      await item.update(req.body);
      res.status(200).json(item);
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }


  export async function deletePicture(req:any, res:any) {
    try {
      const schema = pictureSchema().destroy();
      validateSchema(schema, req.body);
  
      const item = await Picture.findByPk(req.params.id);
      if (!item) {
        return res.status(404).json({ error: 'Picture not found' });
      }
  
      await item.destroy();
      res.status(200).json({ message: 'Picture deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }
  