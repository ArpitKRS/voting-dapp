import React, { useContext, createContext, useState, useEffect } from 'react';
import { useAddress, useContract, useContractWrite, useMetamask } from '@thirdweb-dev/react';

const VotingContext = createContext();

export const VotingContextProvider = ({ children }) => {
  const address = useAddress();
  const connect = useMetamask();

  const { contract, isLoading } = useContract('0xDD734ab4343fB265f05ECa248f423cDAB46fe3Ac');
  const { mutateAsync: addCandidate } = useContractWrite(contract, 'addCandidate');
  const { mutateAsync: vote } = useContractWrite(contract, 'vote');

  // States
  const [candidates, setCandidates] = useState([]);
  const [votingActive, setVotingActive] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [winner, setWinner] = useState(null);

  const fetchData = async () => {
    if (!contract) return;
  
    try {
      const fetchedCandidates = await contract.call('getAllVotesOfCandidates');
      setCandidates(fetchedCandidates);
  
      const isVotingActive = await contract.call('getVotingStatus');
      setVotingActive(isVotingActive);
  
      const timeRemaining = await contract.call('getRemainingTime');
      setRemainingTime(timeRemaining);
  
      // Only call getWinner if voting is not active (i.e., it has ended)
      if (!isVotingActive) {
        const fetchedWinner = await contract.call('getWinner');
        setWinner(fetchedWinner);
      } else {
        setWinner(null); // Reset the winner if voting is still active
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  useEffect(() => {
    if (contract) {
      fetchData();
    }
  }, [contract]);

  const handleAddCandidate = async (form) => {
    try {
      await addCandidate({ args: [form.name] });
      console.log('Candidate added successfully!');
      fetchData();
    } catch (error) {
      console.error('Error adding the candidates', error);
    }
  };

  const handleVote = async (form) => {
    try {
      await vote({ args: [form.candidateIndex] });
      console.log('Casted vote successfully!');
      fetchData();
    } catch (error) {
      console.error('Error while casting a vote', error);
    }
  };

  const getAllCandidatesData = async () => {
    return await contract.call('getAllVotesOfCandidates');
  };

  const getVotingStatusData = async () => {
    return await contract.call('getVotingStatus');
  };

  const getRemainingTimeData = async () => {
    return await contract.call('getRemainingTime');
  };

  const getWinnerData = async () => {
    return await contract.call('getWinner');
  };

  return (
    <VotingContext.Provider
      value={{
        address,
        contract,
        isLoading,
        candidates,
        votingActive,
        remainingTime,
        winner,
        connect,
        handleAddCandidate,
        handleVote,
        getAllCandidatesData,
        getVotingStatusData,
        getRemainingTimeData,
        getWinnerData,
      }}
    >
      {children}
    </VotingContext.Provider>
  );
};

export const useStateContext = () => useContext(VotingContext);
