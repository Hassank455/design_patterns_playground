/* ========= Products ========= */

interface Parser {
  parse(data: string): any;
}

/* ========= Concrete Product  ========= */

class JsonParser implements Parser {
  parse(content: string): unknown {
    try {
      return JSON.parse(content);
    } catch {
      throw new Error("Invalid JSON content.");
    }
  }
}

class XmlParser implements Parser {
  parse(content: string): unknown {
    // Simplified XML parsing simulation
    if (!content.trim().startsWith("<")) {
      throw new Error("Invalid XML content.");
    }

    return {
      type: "xml",
      rawContent: content,
      message: "XML parsed successfully (simulated).",
    };
  }
}
class CsvParser implements Parser {
  parse(content: string): unknown {
    const lines = content.trim().split("\n");
    const rows = lines.map((line) => line.split(","));

    return {
      type: "csv",
      rows,
      message: "CSV parsed successfully.",
    };
  }
}

/* ========= Creator  ========= */

abstract class ParserCreator {
  protected abstract createParser(): Parser;

  public processFile(content: string): unknown {
    const normalizedContent = this.normalizeContent(content);

    const parser = this.createParser();
    const result = parser.parse(normalizedContent);

    this.logSuccess();

    return result;
  }

  protected normalizeContent(content: string): string {
    return content.trim();
  }

  protected logSuccess(): void {
    console.log("File processed successfully.");
  }
}

/* ========= Concrete Creator  ========= */

class JsonParserCreator extends ParserCreator {
  protected createParser(): Parser {
    return new JsonParser();
  }
}

class XmlParserCreator extends ParserCreator {
  protected createParser(): Parser {
    return new XmlParser();
  }
}

class CsvParserCreator extends ParserCreator {
  protected createParser(): Parser {
    return new CsvParser();
  }
}
/* ========= run  ========= */
function runParser(creator: ParserCreator, content: string): void {
  try {
    const result = creator.processFile(content);
    console.log(result);
    console.log("---------------------------");
  } catch (error) {
    console.error("Parsing failed:", (error as Error).message);
    console.log("---------------------------");
  }
}

function main(): void {
  const jsonParser = new JsonParserCreator();
  const xmlParser = new XmlParserCreator();
  const csvParser = new CsvParserCreator();

  runParser(jsonParser, `{"name":"Hassan","role":"Developer"}`);
  runParser(xmlParser, `<user><name>Hassan</name></user>`);
  runParser(csvParser, `name,role\nHassan,Developer`);
}

main();
