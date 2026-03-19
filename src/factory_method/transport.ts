/* ========= Products ========= */

interface Transport {
  deliver(): void;
}

/* ========= Concrete Product  ========= */

class Truck implements Transport {
  deliver(): void {
    console.log("Delivering goods by road using a truck.");
  }
}

class Ship implements Transport {
  deliver(): void {
    console.log("Delivering goods by sea using a ship.");
  }
}

class Airplane implements Transport {
  deliver(): void {
    console.log("Delivering goods by air using an airplane.");
  }
}

/* ========= Creator  ========= */

abstract class Logistics {
  protected abstract createTransport(): Transport;

  public planDelivery(): void {
    console.log("Preparing delivery plan...");
    console.log("Checking package details...");
    console.log("Assigning the best available transport...");

    const transport = this.createTransport();
    transport.deliver();

    console.log("Delivery process started successfully.");
  }
}

/* ========= Concrete Creators  ========= */

class RoadLogistics extends Logistics {
  protected createTransport(): Transport {
    return new Truck();
  }
}

class SeaLogistics extends Logistics {
  protected createTransport(): Transport {
    return new Ship();
  }
}

class AirLogistics extends Logistics {
  protected createTransport(): Transport {
    return new Airplane();
  }
}

/* ========= run  ========= */
function startDelivery(logistics: Logistics): void {
  logistics.planDelivery();
  console.log("---------------------------");
}

function main(): void {
  const roadLogistics = new RoadLogistics();
  const seaLogistics = new SeaLogistics();
  const airLogistics = new AirLogistics();

  startDelivery(roadLogistics);
  startDelivery(seaLogistics);
  startDelivery(airLogistics);
}

main();
