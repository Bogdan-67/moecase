const stockService = require('../service/stock-service');
const uuid = require('uuid');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');

class StockController {
  async getAllStocks(req, res, next) {
    try {
      const stock = await stockService.getAllStocks();
      res.status(200).json(stock);
    } catch (e) {
      next(e);
    }
  }
  async createStock(req, res, next) {
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

      const stock = await stockService.createStock(ticker, name, description, logoName, color);
      res.status(200).json(stock);
    } catch (e) {
      next(e);
    }
  }
  async editStock(req, res, next) {
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

      const stock = await stockService.createStock(ticker, name, description, logoName, color);
      res.status(200).json(stock);
    } catch (e) {
      next(e);
    }
  }
  async deleteStock(req, res, next) {
    try {
      const { id_stock } = req.body;
      await stockService.deleteStock(id_stock);
      res.status(200);
    } catch (e) {
      next(e);
    }
  }
  async getOneStock(req, res, next) {
    try {
      const stock = await stockService.getOneStock(req.params);
      res.status(200).json(stock);
    } catch (e) {
      next(e);
    }
  }
}
module.exports = new StockController();
