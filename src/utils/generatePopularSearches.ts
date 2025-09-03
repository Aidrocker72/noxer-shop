import type { IProduct } from "../interfaces/Product/IProduct";

export const generatePopularSearches = (products: IProduct[]): string[] => {
  const wordFrequency = new Map<string, number>();
  const commonWords = new Set([
    'и', 'в', 'на', 'с', 'по', 'для', 'от', 'до', 'как', 'бы', 'но', 'или', 'же',
    'что', 'это', 'он', 'она', 'они', 'мы', 'вы', 'я', 'мне', 'мной', 'меня',
    'тот', 'этот', 'такой', 'такого', 'такой', 'такие', 'все', 'всё', 'всех',
    'который', 'которые', 'которого', 'которым', 'которая', 'которую', 'которых',
    'из', 'у', 'под', 'над', 'за', 'до', 'без', 'возле', 'около', 'между',
    'со', 'от', 'до', 'через', 'вокруг', 'вдоль', 'после', 'перед', 'при',
    'об', 'обо', 'о', 'про', 'насчет', 'вместо', 'вроде', 'словно', 'будто',
    'лишь', 'только', 'же', 'вот', 'ну', 'а', 'но', 'да', 'нет', 'не', 'ни',
    'же', 'бы', 'ли', 'ль', 'так', 'также', 'тоже', 'тогда', 'потом', 'ещё',
    'уже', 'сейчас', 'сегодня', 'вчера', 'завтра', 'здесь', 'там', 'куда',
    'откуда', 'почему', 'зачем', 'как', 'какой', 'какая', 'какое', 'какие',
    'чей', 'чья', 'чьё', 'чьи', 'сколько', 'много', 'мало', 'немного', 'очень',
    'слишком', 'почти', 'всегда', 'иногда', 'редко', 'никогда', 'часто'
  ]);

  const splitWords = (text: string): string[] => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-zа-я0-9\s]/gi, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2 && !commonWords.has(word));
  };

  products.forEach(product => {
    const nameWords = splitWords(product.Product_Name);
    nameWords.forEach(word => {
      wordFrequency.set(word, (wordFrequency.get(word) || 0) + 1);
    });

    product.parameters.forEach(param => {
      const paramWords = splitWords(param.name);
      paramWords.forEach(word => {
        wordFrequency.set(word, (wordFrequency.get(word) || 0) + 1);
      });
    });
  });

  return Array.from(wordFrequency.entries())
    .sort((a, b) => b[1] - a[1])
    .map(entry => entry[0])
    .slice(0, 10);
};
