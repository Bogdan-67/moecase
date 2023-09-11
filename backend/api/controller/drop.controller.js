const dropService = require('../service/drop-service');
const uuid = require('uuid');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');

class DropController {
  async getAllDrop(req, res, next) {
    try {
      const drop = await dropService.getAllDrop();
      res.status(200).json(drop);
    } catch (e) {
      next(e);
    }
  }
  async createDrop(req, res, next) {
    try {
      console.log(req.body);
      console.log(req.files);
      const { ticker, name, description, color } = req.body;

      const { logo } = req.files;

      console.log('color', color);

      const maxSize = 10 * 1024 * 1024; // Максимальный размер файла в байтах (10 МБ)
      let logoName = uuid.v4() + '.jpg';
      const filePath = path.resolve(__dirname, '..', 'static', logoName);

      if (logo.size > maxSize) {
        // Изображение превышает максимальный размер, необходимо сжатие
        sharp(logo.data)
          .resize({ width: 800, height: 600 }) // Установите необходимые размеры
          .toFile(filePath, (err, info) => {
            if (err) {
              console.error('Ошибка при сжатии изображения:', err);
              return res.status(500).json({ message: 'Ошибка при сжатии изображения.' });
            }
            console.log('Изображение успешно сжато:', info);
          });
      } else {
        // Изображение не превышает максимальный размер, сохраняем его без изменений
        logo.mv(filePath, (err) => {
          if (err) {
            console.error('Ошибка при сохранении изображения:', err);
            return res.status(500).json({ message: 'Ошибка при сохранении изображения.' });
          }
          console.log('Изображение успешно сохранено');
        });
      }

      const drop = await dropService.createDrop(ticker, name, description, logoName, color);
      res.status(200).json(drop);
    } catch (e) {
      next(e);
    }
  }
  async editDrop(req, res, next) {
    try {
      const { ticker, name, description, color, oldLogo } = req.body;

      const { newLogo } = req.files;

      const oldLogoPath = path.resolve(__dirname, '..', 'static', oldLogo);

      fs.unlink(oldLogoPath, (err) => {
        if (err) {
          console.error(`Ошибка при удалении фото: ${err}`);
          res.status(500).send('Ошибка при удалении фото');
        } else {
          console.log(`${oldLogoPath} успешно удален`);
        }
      });

      const maxSize = 10 * 1024 * 1024; // Максимальный размер файла в байтах (10 МБ)
      let logoName = uuid.v4() + '.jpg';
      const filePath = path.resolve(__dirname, '..', 'static', logoName);

      if (newLogo.size > maxSize) {
        // Изображение превышает максимальный размер, необходимо сжатие
        sharp(newLogo.data)
          .resize({ width: 800, height: 600 }) // Установите необходимые размеры
          .toFile(filePath, (err, info) => {
            if (err) {
              console.error('Ошибка при сжатии изображения:', err);
              return res.status(500).json({ message: 'Ошибка при сжатии изображения.' });
            }
            console.log('Изображение успешно сжато:', info);
          });
      } else {
        // Изображение не превышает максимальный размер, сохраняем его без изменений
        newLogo.mv(filePath, (err) => {
          if (err) {
            console.error('Ошибка при сохранении изображения:', err);
            return res.status(500).json({ message: 'Ошибка при сохранении изображения.' });
          }
          console.log('Изображение успешно сохранено');
        });
      }

      const drop = await dropService.createDrop(ticker, name, description, logoName, color);
      res.status(200).json(drop);
    } catch (e) {
      next(e);
    }
  }
  async deleteDrop(req, res, next) {
    try {
      const { id_drop } = req.body;
      await dropService.deleteDrop(id_drop);
      res.status(200);
    } catch (e) {
      next(e);
    }
  }
  async getOneDrop(req, res, next) {
    try {
      const drop = await dropService.getOneDrop(req.params);
      res.status(200).json(drop);
    } catch (e) {
      next(e);
    }
  }
}
module.exports = new DropController();
