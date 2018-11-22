// THIS FILE IS FOR GLOBALLY AVAILABLE TYPE DECLARATIONS
declare global {
  namespace Calendar {
    type Event = {
      start: Date,
      end: Date,
      summary: string,
      description: string,
    };
  }
}

export{};
