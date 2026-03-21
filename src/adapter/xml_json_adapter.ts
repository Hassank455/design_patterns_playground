/* ========= Target ========= */
interface JsonDataProvider {
  getData(): Record<string, any>;
}

/* ========= Adaptee ========= */
class XmlService {
  getXml(): string {
    return `
      <user>
        <name>Hassan</name>
        <age>25</age>
      </user>
    `;
  }
}
/* ========= Adapter ========= */
class XmlToJsonAdapter implements JsonDataProvider {
  constructor(private xmlService: XmlService) {}

  getData(): Record<string, any> {
    const xml = this.xmlService.getXml();

    // تحويل بسيط (simulation)
    return this.convertXmlToJson(xml);
  }

  private convertXmlToJson(xml: string): Record<string, any> {
    return {
      name: this.extractValue(xml, "name"),
      age: Number(this.extractValue(xml, "age")),
    };
  }

  private extractValue(xml: string, tag: string): string {
    const regex = new RegExp(`<${tag}>(.*?)</${tag}>`);
    const match = xml.match(regex);
    return match?.[1] ?? "";
  }
}

/* ========= Client ========= */
class App {
  constructor(private dataProvider: JsonDataProvider) {}

  run(): void {
    const data = this.dataProvider.getData();

    console.log("User Data:");
    console.log(data);
  }
}

/* ========= run  ========= */
function main() {
  const xmlService = new XmlService();

  const adapter = new XmlToJsonAdapter(xmlService);

  const app = new App(adapter);

  app.run();
}

main();
