import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";

export default function PositionInfo() {
  return (
    <div className="w-full flex flex-col gap-4">
      <Tabs defaultValue="positions" className="w-full">
        <div className="w-full border-b border-b-muted-foreground/30 mb-2 flex items-center">
          <TabsList className="inline-flex h-9 items-center rounded-none bg-transparent p-0 gap-2 border-b-0">
            <TabsTrigger value="positions" className="custom-tabs-trigger">
              Positions
            </TabsTrigger>
            <TabsTrigger value="open-orders" className="custom-tabs-trigger">
              Open Orders
            </TabsTrigger>
            <TabsTrigger value="trade-history" className="custom-tabs-trigger">
              Trade History
            </TabsTrigger>
            <TabsTrigger value="order-history" className="custom-tabs-trigger">
              Order History
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="positions">
          <div className="text-muted-foreground text-center py-8">
            No positions
          </div>
        </TabsContent>
        <TabsContent value="open-orders">
          <div className="text-muted-foreground text-center py-8">
            No open orders
          </div>
        </TabsContent>
        <TabsContent value="trade-history">
          <div className="text-muted-foreground text-center py-8">
            No trade history
          </div>
        </TabsContent>
        <TabsContent value="order-history">
          <div className="text-muted-foreground text-center py-8">
            No order history
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
