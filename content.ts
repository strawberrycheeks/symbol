export const PresentationContent = {
  title: 'Символы в языке JavaScript',
  slides: [
    {
      title: 'Символы в языке JavaScript',
      content: [
        'Презентацию подготовили:',
        'Абрамушкина Екатерина Сергеевна,',
        'Мурзин Михаил Владимирович,',
        'студенты 1 курса магистратуры «Веб-технологии»',
      ],
    },
    {
      title: 'О чем мы сегодня расскажем?',
      content: [
        '• Что такое символ и как его можно создать',
        '• Какие символы называются системными',
        '• Какие свойства и методы есть у объекта Symbol',
        '• Для чего можно использовать Symbol',
      ],
    },
    {
      title: 'Тип данных symbol и объект Symbol',
      content: ['Символ представляет собой уникальный идентификатор.', 'Можно использовать в качестве ключей для свойств объектов.'],
      codeExample:
        "const symbol = Symbol(\"id\");\nlet exampleObject = {\n  props: 'Hello!',\n  [symbol]: 42,\n};\n\nconsole.log(exampleObject[symbol]); // Ожидаемый вывод: 42\n\nconsole.log(Object.keys(exampleObject)); // Ожидаемый вывод: [ 'props' ]\n\nconsole.log(Reflect.ownKeys(exampleObject)); // Ожидаемый вывод: [ 'props', Symbol(id) ]\nconsole.log(exampleObject[Reflect.ownKeys(exampleObject)[1]]); // Ожидаемый вывод: 42\n",
    },
    {
      title: 'Создание символов',
      content: [
        'Значение символа является гарантированно уникальным и неизменяемым.',
        'Новые символы создаются с помощью вызова функции Symbol().',
      ],
      codeExample:
        '// Создаем символы symbolA и symbolB с описанием "id"\nlet symbolA = Symbol("id");\nlet symbolB = Symbol("id");\nconsole.log(symbolA == symbolB); // Ожидаемый вывод: false\n\nlet symbol = new Symbol();\n// Ожидаемый вывод: TypeError: Symbol is not a constructor\n',
    },
    {
      title: 'Свойства и методы Symbol',
      content: ['За исключением описания, все свойства объекта Symbol являются статическими.'],
      codeExample:
        '// Свойства\nSymbol.prototype.description\nSymbol.asyncIterator\nSymbol.hasInstance\nSymbol.isConcatSpreadable\nSymbol.iterator\nSymbol.match\nSymbol.matchAll\nSymbol.replace\nSymbol.search\nSymbol.species\nSymbol.split\nSymbol.toPrimitive\nSymbol.toStringTag\nSymbol.unscopables\n\n// Методы\nSymbol.for()\nSymbol.keyFor()\nSymbol.prototype.toString()\nSymbol.prototype.valueOf()\n',
    },
    {
      title: 'Symbol.prototype.description',
      content: [
        'При создании символа можно добавить описание. Чаще всего описание используется для отладки кода.',
        'При помощи данного свойства можно получить описание символа.',
      ],
      codeExample:
        'console.log(Symbol("description").description);\n// Ожидаемый вывод: "description"\n\nconsole.log(Symbol.for("foo").description);\n// Ожидаемый вывод: "foo"\n\nconsole.log(Symbol.iterator.description);\n// Ожидаемый вывод: "Symbol.iterator"\n\nconsole.log(`${Symbol("foo").description}bar`);\n// Ожидаемый вывод: "foobar"\n',
    },
    {
      title: 'Системные символы в языке JavaScript',
      content: [
        'Существует множество системных символов (англ. well-known symbols), которые используются внутри самого JavaScript.',
        'Их можно использовать, чтобы настраивать различные аспекты поведения объектов.',
      ],
      codeExample:
        "interface SymbolConstructor {\n  /**\n   * A method that determines if a constructor object recognizes an object as one of the\n   * constructor’s instances. Called by the semantics of the instanceof operator.\n   */\n  readonly hasInstance: unique symbol;\n\n  /**\n   * A Boolean value that if true indicates that an object should flatten to its array elements\n   * by Array.prototype.concat.\n   */\n  readonly isConcatSpreadable: unique symbol;\n\n  /**\n   * A regular expression method that matches the regular expression against a string. Called\n   * by the String.prototype.match method.\n   */\n  readonly match: unique symbol;\n\n  /**\n   * A regular expression method that replaces matched substrings of a string. Called by the\n   * String.prototype.replace method.\n   */\n  readonly replace: unique symbol;\n\n  /**\n   * A regular expression method that returns the index within a string that matches the\n   * regular expression. Called by the String.prototype.search method.\n   */\n  readonly search: unique symbol;\n\n  /**\n   * A function valued property that is the constructor function that is used to create\n   * derived objects.\n   */\n  readonly species: unique symbol;\n\n  /**\n   * A regular expression method that splits a string at the indices that match the regular\n   * expression. Called by the String.prototype.split method.\n   */\n  readonly split: unique symbol;\n\n  /**\n   * A method that converts an object to a corresponding primitive value.\n   * Called by the ToPrimitive abstract operation.\n   */\n  readonly toPrimitive: unique symbol;\n\n  /**\n   * A String value that is used in the creation of the default string description of an object.\n   * Called by the built-in method Object.prototype.toString.\n   */\n  readonly toStringTag: unique symbol;\n\n  /**\n   * An Object whose truthy properties are properties that are excluded from the 'with'\n   * environment bindings of the associated objects.\n   */\n  readonly unscopables: unique symbol;\n}",
    },

    {
      title: 'Symbol.asyncIterator',
      content: ['Позволяет создать для символа асинхронный итератор.'],
      codeExample:
        'let range = {\n  from: 1,\n  to: 5,\n  async *[Symbol.asyncIterator]() {\n    for (let value = this.from; value <= this.to; value++) {\n      await new Promise(resolve => setTimeout(resolve, 1000));\n      yield value;\n    }\n  },\n};\n\n(async () => {\n  for await (let value of range) {\n    console.log(value);\n  }\n})();\n',
    },
    {
      title: 'Symbol.hasInstance',
      content: [
        'Позволяет задать метод, который будет использоваться при вызове оператора instanceof и определять, является ли объект экземляром класса.',
      ],
      codeExample:
        'class CustomArray {\n  static [Symbol.hasInstance](instance) {\n    return Array.isArray(instance);\n  }\n}\n\nconsole.log([] instanceof CustomArray); // Ожидаемый вывод: true\n',
    },
    {
      title: 'Symbol.isConcatSpreadable',
      content: [
        'Определяет поведение метода Array.prototype.concat. Если значение равно true, то объекты массива должны быть "извлечены".',
      ],
      codeExample:
        "const numeric = ['1', '2', '3'];\n\nconst alpha = ['a', 'b', 'c'];\nconst alphaNumeric = numeric.concat(alpha);\nconsole.log(alphaNumeric); // Ожидаемый вывод: [ '1', '2', '3', 'a', 'b', 'c' ]\n\nnumeric[Symbol.isConcatSpreadable] = false;\n\nconst beta = ['a', 'b', 'c'];\nconst betaNumeric = numeric.concat(beta);\nconsole.log(betaNumeric); // Ожидаемый вывод: [ ['1', '2', '3'], 'a', 'b', 'c' ]\n",
    },
    {
      title: 'Symbol.iterator',
      content: ['Позволяет определить итератор для объекта.'],
      codeExample:
        'const iterable = {};\niterable[Symbol.iterator] = function* () {\n  yield 1;\n  yield 2;\n  yield 3;\n};\n\nconsole.log([...iterable]); // Ожидаемый вывод: Array [1, 2, 3]\n',
    },
    {
      title: 'Symbol.match',
      content: [
        'Используется для поиска первого вхождения данного символа в строку.',
        'Также определяет, нужно ли рассматривать объект как регулярное значение.',
      ],
      codeExample:
        "const regexp1 = /foo/;\n\n// console.log('/foo/'.startsWith(regexp1));\n// Ожидаемый вывод (Chrome): Error: First argument to String.prototype.startsWith must not be a regular expression\n// Ожидаемый вывод (Firefox): Error: Invalid type: first can't be a Regular Expression\n// Ожидаемый вывод (Safari): Error: Argument to String.prototype.startsWith cannot be a RegExp\n\nregexp1[Symbol.match] = false;\nconsole.log('/foo/'.startsWith(regexp1)); // Ожидаемый вывод: true\nconsole.log('/baz/'.endsWith(regexp1)); // Ожидаемый вывод: false",
    },
    {
      title: 'Symbol.matchAll',
      content: ['Используется для поиска всех вхождений данного символа в строку.'],
      codeExample:
        "const re = /[0-9]+/g;\nconst str = '2016-01-02|2019-03-07';\nconst result = re[Symbol.matchAll](str);\n\nconsole.log(Array.from(result, x => x[0]));\n// Ожидаемый вывод: ['2016', '01', '02', '2019', '03', '07']",
    },
    {
      title: 'Symbol.replace',
      content: ['Используется при вызове метода String.prototype.replace для замены вхождений подстроки в строку.'],
      codeExample:
        "class Replace {\n  constructor(value) {\n    this.value = value;\n  }\n\n  [Symbol.replace](string) {\n    return `s/${string}/${this.value}/g`;\n  }\n}\n\nconsole.log('foo'.replace(new Replace('bar')));\n// Ожидаемый вывод: 's/foo/bar/g'",
    },
    {
      title: 'Symbol.search',
      content: ['Используется методом String.prototype.search, возвращает индекс внутри строки, соответствующий регулярному выражению.'],
      codeExample:
        "class Search {\n  constructor(value) {\n    this.value = value;\n  }\n\n  [Symbol.search](string) {\n    return string.indexOf(this.value);\n  }\n}\n\nconsole.log('foobar'.search(new Search('bar'))); // Ожидаемый вывод: 3",
    },

    {
      title: 'Symbol.species',
      content: [
        'Используется для создания производных объектов. Методы, создающие копии объекта, могут использовать данный символ у объекта при создании копии.',
      ],
      codeExample:
        'class SpeciesArray extends Array {\n  static get [Symbol.species]() {\n    return Array;\n  }\n}\n\nconst a = new SpeciesArray(1, 2, 3);\nconst mapped = a.map((x) => x * x);\n\nconsole.log(mapped instanceof SpeciesArray); // Ожидаемый вывод: false\nconsole.log(mapped instanceof Array); 		   // Ожидаемый вывод: true',
    },
    {
      title: 'Symbol.split',
      content: ['Используется методом String.prototype.split, разбивает строку по индексам, соответствующим регулярному выражению.'],
      codeExample:
        'class Split {\n  constructor(value) {\n    this.value = value;\n  }\n\n  [Symbol.split](string) {\n    const index = string.indexOf(this.value);\n    return `${this.value}${string.substring(0, index)}/${string.substring(\n      index + this.value.length,\n    )}`;\n  }\n}\nconsole.log("foobar".split(new Split("foo"))); // Ожидаемый вывод: "foo/bar"',
    },
    {
      title: 'Symbol.toPrimitive',
      content: ['Используется для приведения объекта к примитиву. Параметр hint может принимать значения "number", "string", "default").'],
      codeExample:
        'let user = {\n  name: \'John\',\n  money: 1000,\n\n  [Symbol.toPrimitive](hint) {\n    return hint == \'string\' ? `{name: "${this.name}"}` : this.money;\n  },\n};\n\nconsole.log(String(user)); // hint примет значение "string", ожидаемый вывод: {name: \'John\'}\nconsole.log(+user); // hint примет значение "number", ожидаемый вывод: 1000',
    },
    {
      title: 'Symbol.toStringTag',
      content: ['Используется для установления собственного тега для класса.'],
      codeExample:
        'class ValidatorClass {\n  get [Symbol.toStringTag]() {\n    return \'Validator\';\n  }\n}\nconsole.log(Object.prototype.toString.call(new ValidatorClass()));\n// Ожидаемый вывод: "[object Validator]"',
    },
    {
      title: 'Symbol.unscopables',
      content: [
        'При помощи свойства unscopables для любого объекта можно исключить отображение имен в качестве логических переменных в with привязках среды.',
      ],
      codeExample:
        'let obj1 = {\n    val: "Have",\n    val1: "FUN"\n};\nobj1[Symbol.unscopables] = {\n    val1: false,\n    val: true\n};\n\nwith (obj1) {\n    console.log(val1); // "FUN"\n}\nwith (obj1) {\n    console.log(val);  // ReferenceError: val is not defined\n}',
    },
    {
      title: 'Symbol.for()',
      content: [
        'Имеет обязательный параметр key – это идентификатор символа.',
        'Ищет существующий символ с заданным ключом в реестре символов всей среды выполнения и возвращает его адрес, если он найден. Иначе в глобальном реестре символов создается новый символ с этим ключом.',
      ],
      codeExample:
        'console.log(Symbol.for("bar") === Symbol.for("bar"));\n// Ожидаемый вывод: true\n\nconsole.log(Symbol("bar") === Symbol("bar"));\n// Ожидаемый вывод: false\n\nconst s = Symbol.for("foo");\nconsole.log(s.toString());\n// Ожидаемый вывод: "Symbol(foo)"\n',
    },
    {
      title: 'Symbol.keyFor()',
      content: ['Извлекает общий ключ символа из глобального реестра символов для данного символа.'],
      codeExample:
        '// Получаем существующий символ для "foo" или создаем новый символ в глобальном реестре\nconst globalSym = Symbol.for("foo");\nconsole.log(Symbol.keyFor(globalSym)); // Ожидаемый вывод: "foo"\n\nconst localSym = Symbol();\nconsole.log(Symbol.keyFor(localSym)); // Ожидаемый вывод: undefined\n\nconsole.log(Symbol.keyFor(Symbol.iterator)); // Ожидаемый вывод: undefined',
    },
    {
      title: 'Symbol.prototype.toString()',
      content: ['Используется для преобразования символа к строке. Возвращает строку в формате "Symbol(description)".'],
      codeExample:
        'console.log(Symbol("description").toString());\n// Ожидаемый вывод: "Symbol(description)"\n\nconsole.log(Symbol.iterator.toString());\n// Ожидаемый вывод: "Symbol(Symbol.iterator)"\n\nconsole.log(Symbol.for("foo").toString());\n// Ожидаемый вывод: "Symbol(foo)"\n\nconsole.log(Symbol("foo") + "bar");\n// Ожидаемый вывод: TypeError: Cannot convert a Symbol value to a string',
    },
    {
      title: 'Symbol.prototype.constructor',
      content: ['Возвращает метод, который был вызван при создании экземпляра.', 'По умолчанию возвращает функцию Symbol.'],
      codeExample: 'const str = Symbol();\nconsole.log(str.constructor); // Ожидаемый вывод: [Function: Symbol]',
    },
    {
      title: 'Symbol.prototype.valueOf()',
      content: ['Возвращает примитивное значение типа Symbol в виде данных типа Symbol.'],
      codeExample:
        'const symbol1 = Symbol("foo");\n\nconsole.log(typeof Object(symbol1));\n// Ожидаемый вывод: "object"\n\nconsole.log(typeof Object(symbol1).valueOf());\n// Ожидаемый вывод: "symbol"',
    },
    {
      title: 'Почему стоит использовать Symbol?',
      content: [
        'Значения символов уникальны и неизменяемы.',
        'Символы можно использовать в качестве защищенных свойств и методов в классах.',
      ],
    },
    {
      title: 'Best practices: использование символа как ключа',
      content: [],
      codeExample:
        'let id = Symbol("id");\nlet person = {\n    name: "Jack",\n    [id]: 123 // Используем символ в качестве ключа\n};\nconsole.log(person); // Ожидаемый вывод: {name: "Jack", Symbol(id): 123}\n',
    },
    {
      title: 'Best practices: использование символа как ключа защищенных свойств',
      content: [],
      codeExample:
        'const _counter = Symbol("counter");\nconst _action = Symbol("action");\n \nclass Countdown {\n  constructor(counter, action) {\n     this[_counter] = counter;\n     this[_action] = action;\n   }\n \n  dec() {\n     let counter = this[_counter];\n     if (counter < 1) return;\n     counter--;\n     this[_counter] = counter;\n     if (counter === 0) {\n       this[_action]();\n     }\n   }\n }',
    },
    {
      title: 'Best practices: символы не перечисляются в цикле',
      content: [],
      codeExample:
        'let id = Symbol("id");\nlet person = {\n  name: "Jack",\n  age: 25,\n  [id]: 12,\n};\n\n// Используем цикл for...in\nfor (const key in person) {\n  console.log(key);\n}\n// Ожидаемый вывод: name age',
    },
  ],
};
