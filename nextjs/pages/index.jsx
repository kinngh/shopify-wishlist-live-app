import isInitialLoad from "@/utils/middleware/isInitialLoad";
import {
  BlockStack,
  Button,
  Card,
  InlineStack,
  Layout,
  List,
  Page,
  Text,
} from "@shopify/polaris";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  //DO NOT REMOVE THIS.
  return await isInitialLoad(context);
  //DO NOT REMOVE THIS.
}

const Index = () => {
  const router = useRouter();
  return (
    <>
      <Page title="Dashboard">
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="200">
                <List>
                  <List.Item>
                    Setup block to ensure merchant sets up the theme extension
                  </List.Item>
                  <List.Item>Analytics (polaris viz)</List.Item>
                  <List.Item>
                    See which customer has wishlisted a certain product
                  </List.Item>
                  <List>
                    <List.Item>
                      Click on product to see customers who wishlisted it
                    </List.Item>
                    <List.Item>
                      Click on customer to see what products they wishlisted
                    </List.Item>
                  </List>
                  <List.Item>
                    Orders create and update webhooks so if a new order comes in
                    with line item attribute of `_wishlist`, that means the
                    product was in customer's wishlist. Remove it from wishlist
                    and add it to analytics.
                  </List.Item>
                </List>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </>
  );
};

export default Index;
