import { useQuery, useMutation } from "convex/react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { FunctionReference, FunctionReturnType, OptionalRestArgs } from "convex/server";

export const useConvexQuery = (
    query: any,
    ...args: any[]
) => {
    // @ts-ignore - useQuery types are tricky with spread args
    const result = useQuery(query, ...(args as any));
    const [data, setData] = useState<any>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    // Use effect to handle the state changes based on the query result
    useEffect(() => {
        if (result === undefined) {
            setIsLoading(true);
        } else {
            try {
                setData(result);
                setError(null);
            } catch (err: any) {
                setError(err);
                toast.error(err.message);
            } finally {
                setIsLoading(false);
            }
        }
    }, [result]);

    return {
        data,
        isLoading,
        error,
    };
};

export const useConvexMutation = <Mutation extends FunctionReference<"mutation">>(
    mutation: Mutation
) => {
    const mutationFn = useMutation(mutation);
    const [data, setData] = useState<FunctionReturnType<Mutation> | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const mutate = async (args: any) => {
        setIsLoading(true);
        setError(null);

        try {
            // @ts-ignore
            const response = await mutationFn(args);
            setData(response);
            return response;
        } catch (err: any) {
            setError(err);
            toast.error(err.message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return { mutate, data, isLoading, error };
};
