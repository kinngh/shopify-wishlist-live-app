import SetupGuideComponent from "@/components/home/SetupGuideComponent";
import isInitialLoad from "@/utils/middleware/isInitialLoad";
import {
  Banner,
  BlockStack,
  Box,
  Button,
  Card,
  Layout,
  Link,
  List,
  Page,
  Text,
} from "@shopify/polaris";
import { useRouter } from "next/router";
import { useState } from "react";

export async function getServerSideProps(context) {
  //DO NOT REMOVE THIS.
  return await isInitialLoad(context);
  //DO NOT REMOVE THIS.
}

const Index = () => {
  const router = useRouter();
  const [items, setItems] = useState([
    {
      id: 0,
      title: "Enable Theme Extension",
      description: "Skidaddle skadoodle you know how it be.",
      image: {
        url: "https://cdn.shopify.com/shopifycloud/shopify/assets/admin/home/onboarding/shop_pay_task-70830ae12d3f01fed1da23e607dc58bc726325144c29f96c949baca598ee3ef6.svg",
        alt: "Illustration highlighting ShopPay integration",
      },
      complete: false,
      primaryButton: {
        content: "Add product",
        // props: {
        //   url: "https://www.example.com",
        //   external: true,
        // },
      },
      secondaryButton: {
        content: "30s tutorial",
        props: {
          url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUIcmlja3JvbGw%3D",
          external: true,
        },
      },
    },
    {
      id: 1,
      title: "Enable new account experience",
      description: "Skibbidi",
      image: {
        url: "https://cdn.shopify.com/shopifycloud/shopify/assets/admin/home/onboarding/detail-images/home-onboard-share-store-b265242552d9ed38399455a5e4472c147e421cb43d72a0db26d2943b55bdb307.svg",
        alt: "Illustration showing an online storefront with a 'share' icon in top right corner",
      },
      complete: false,
      primaryButton: {
        content: "Enabled",
        props: {
          onAction: () => alert("Enabled"),
        },
      },
    },
  ]);

  // Example of step complete handler, adjust for your use case
  const onStepComplete = async (id) => {
    try {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, complete: !item.complete } : item
        )
      );
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Page title="Dashboard">
        <Layout>
          <Layout.Section variant="fullWidth">
            <Banner tone="info" title="To do">
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
            </Banner>
          </Layout.Section>
          <Layout.Section>
            <SetupGuideComponent
              onStepComplete={onStepComplete}
              items={items}
            />
          </Layout.Section>
          <Layout.Section>
            <Card>
              <BlockStack gap="200"></BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
        <Box paddingBlockStart="200">
          <Text tone="subdued" alignment="center">
            Setup component from{" "}
            <Link
              url="https://github.com/RAAbbott/polaris-components"
              target="_blank"
            >
              RAAbbott/polaris-components
            </Link>
          </Text>
        </Box>
      </Page>
    </>
  );
};

export default Index;
