import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// sharp('images/example.jpg')
//     .resize(800, 600)
//     .toFile('output/example-resized.jpg')
//     .then(() => console.log('Imatge processada!'))
//     .catch(err => console.error(err));

// Tasca 1: Redimensionar imatges
(async () => {
    try {
        // Miniatura (150x150)
        await sharp('images/logo.png')
            .resize(150, 150)
            .toFile('output/logo-thumbnail.png');
        console.log('Miniatura creada!');

        // Mida mitjana (800x600)
        await sharp('images/logo.png')
            .resize(800, 600)
            .toFile('output/logo-medium.png');
        console.log('Mida mitjana creada!');

        // Mida completa mantenint la proporció
        await sharp('images/logo.png')
            .resize({ width: 1920 })
            .toFile('output/logo-full.png');
        console.log('Mida completa creada!');
    } catch (err) {
        console.error(err);
    }
})();

// Com afecta això al tamany del fitxer?
// R: Reduir la mida de la imatge disminueix el tamany del fitxer, mentre que augmentar la mida pot incrementar-lo, tot i que depèn de la compressió i altres factors.

// Tasca 2: Convertir formats

(async () => {
    try {
        // Convertir a WebP amb qualitat 80
        await sharp('images/logo.png')
            .webp({ quality: 80 })
            .toFile('output/logo.webp');
        console.log('Imatge convertida a WebP amb qualitat 80!');

        // Convertir a WebP amb qualitat 50
        await sharp('images/logo.png')
            .webp({ quality: 50 })
            .toFile('output/logo-quality-50.webp');
        console.log('Imatge convertida a WebP amb qualitat 50!');

        // Convertir a AVIF amb qualitat 80
        await sharp('images/logo.png')
            .avif({ quality: 80 })
            .toFile('output/logo.avif');
        console.log('Imatge convertida a AVIF amb qualitat 80!');

        // Convertir a AVIF amb qualitat 50
        await sharp('images/logo.png')
            .avif({ quality: 50 })
            .toFile('output/logo-quality-50.avif');
        console.log('Imatge convertida a AVIF amb qualitat 50!');
    } catch (err) {
        console.error(err);
    }
})();

// Què és millor per al vostre projecte?
// R: Tenint en compte que la meva pagina es estil ONG, es millor pasar-les a AVIF sense perdre qualitat.

// Tasca 3: Compressió

(async () => {
    try {
        // Compressió JPEG amb qualitat 80
        await sharp('images/logo.png')
            .jpeg({ quality: 80 })
            .toFile('output/logo-quality-80.jpg');
        console.log('Imatge JPEG compressa amb qualitat 80!');

        // Compressió JPEG amb qualitat 60
        await sharp('images/logo.png')
            .jpeg({ quality: 60 })
            .toFile('output/logo-quality-60.jpg');
        console.log('Imatge JPEG compressa amb qualitat 60!');

        // Compressió JPEG amb qualitat 40
        await sharp('images/logo.png')
            .jpeg({ quality: 40 })
            .toFile('output/logo-quality-40.jpg');
        console.log('Imatge JPEG compressa amb qualitat 40!');

        // Compressió PNG amb qualitat 80
        await sharp('images/logo.png')
            .png({ quality: 80 })
            .toFile('output/logo-quality-80.png');
        console.log('Imatge PNG compressa amb qualitat 80!');

        // Compressió PNG amb qualitat 60
        await sharp('images/logo.png')
            .png({ quality: 60 })
            .toFile('output/logo-quality-60.png');
        console.log('Imatge PNG compressa amb qualitat 60!');

        // Compressió PNG amb qualitat 40
        await sharp('images/logo.png')
            .png({ quality: 40 })
            .toFile('output/logo-quality-40.png');
        console.log('Imatge PNG compressa amb qualitat 40!');
    } catch (err) {
        console.error(err);
    }
})();

// Pregunteu-vos: Quina és la millor configuració per obtenir imatges petites però útils?
// R: La millor configuració depèn de l'equilibri entre la mida del fitxer i la qualitat visual acceptable pero jo diria que fins a una qualitat del 40.

// Tasca 4: Afegir marques d’aigua
(async () => {
    try {
        const watermark = await sharp('images/watermark.png')
            .resize(100, 100)
            .toBuffer();

        const positions = [
            { left: 0, top: 0 }, // top-left
            { left: 0, top: 450 }, // bottom-left
            { left: 700, top: 0 }, // top-right
            { left: 700, top: 450 } // bottom-right
        ];

        for (const position of positions) {
            await sharp('images/logo.png')
                .composite([{ input: watermark, gravity: 'southeast', left: position.left, top: position.top }])
                .toFile(`output/logo-watermark-${position.left}-${position.top}.png`);
            console.log(`Imatge amb marca d’aigua a la posició (${position.left}, ${position.top}) creada!`);
        }
    } catch (err) {
        console.error(err);
    }
})();

// Quan pot ser útil aquesta tècnica?
// R: Per quan vulguem afegir una marca d'aigua per les nostres imatges, aixi si algu les descarrega podem assegurar-nos de tenir credit.

// Tasca 5: Processar diverses imatges automàticament
const inputDir = 'images5';
const outputDir = 'output5';

(async () => {
    try {
        const files = fs.readdirSync(inputDir).filter(file => /\.(jpe?g|png)$/i.test(file));

        for (const file of files) {
            const inputFilePath = path.join(inputDir, file);
            const fileName = path.parse(file).name;

            // Generar miniatures
            await sharp(inputFilePath)
                .resize(150, 150)
                .toFile(path.join(outputDir, `${fileName}-thumbnail.png`));
            console.log(`Miniatura de ${file} creada!`);

            // Convertir a WebP
            await sharp(inputFilePath)
                .webp({ quality: 80 })
                .toFile(path.join(outputDir, `${fileName}.webp`));
            console.log(`Imatge ${file} convertida a WebP!`);

            // Convertir a AVIF
            await sharp(inputFilePath)
                .avif({ quality: 80 })
                .toFile(path.join(outputDir, `${fileName}.avif`));
            console.log(`Imatge ${file} convertida a AVIF!`);

            // Comprimir JPEG
            await sharp(inputFilePath)
                .jpeg({ quality: 80 })
                .toFile(path.join(outputDir, `${fileName}-compressed.jpg`));
            console.log(`Imatge ${file} compressa a JPEG!`);

            // Comprimir PNG
            await sharp(inputFilePath)
                .png({ quality: 80 })
                .toFile(path.join(outputDir, `${fileName}-compressed.png`));
            console.log(`Imatge ${file} compressa a PNG!`);
        }
    } catch (err) {
        console.error(err);
    }
})();
